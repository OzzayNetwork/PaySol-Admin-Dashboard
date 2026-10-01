<template>
    <!-- ========== Left Sidebar Start ========== -->

    <div class="vertical-menu">

        <div data-simplebar class="h-100">

            <!--- Sidemenu -->

            <div id="sidebar-menu">

                <!-- Left Menu Start -->

                <!--
                    The menu is data, not markup. Every item below comes from
                    src/nav/adminMenu.js and has already been filtered to what
                    this admin's permissions allow, so nothing here asks who is
                    signed in — it only renders.

                    That replaced ~1,180 lines of hand-written <li> elements and
                    the isActiveParent / isCurrentPage helpers they needed.
                -->

                <ul class="metismenu list-unstyled" id="side-menu">

                    <template v-for="(item, i) in menu" :key="i">

                        <!-- Section label, e.g. "Platform Administration" -->
                        <li v-if="item.heading" class="menu-title">{{ item.label }}</li>

                        <!-- Horizontal rule between sections -->
                        <hr v-else-if="item.divider" />

                        <!--
                            Group. MetisMenu is strict about this shape: the
                            <a class="has-arrow"> and the <ul class="sub-menu">
                            must be siblings, or the collapse breaks.
                        -->
                        <li
                            v-else-if="item.children"
                            :class="{ 'mm-active': isGroupActive(item) }"
                        >

                            <a
                                href="javascript: void(0);"
                                class="waves-effect has-arrow"
                            >
                                <Icon
                                    :icon="iconFor(item, isGroupActive(item))"
                                    class="menu-icon"
                                />
                                <span>{{ item.label }}</span>
                            </a>

                            <ul class="sub-menu" aria-expanded="false">

                                <li
                                    v-for="child in item.children"
                                    :key="child.label"
                                >

                                    <router-link
                                        v-if="child.to"
                                        :to="child.to"
                                        class="waves-effect"
                                    >
                                        {{ child.label }}
                                    </router-link>

                                    <!-- to: null → an action, not a destination -->
                                    <a
                                        v-else
                                        href="#"
                                        class="waves-effect"
                                        @click.prevent="onComposeClick"
                                    >
                                        {{ child.label }}
                                    </a>

                                </li>

                            </ul>

                        </li>

                        <!-- Leaf link -->
                        <li v-else :class="{ active: isActive(item.to) }">

                            <router-link
                                v-if="item.to"
                                :to="item.to"
                                class="waves-effect"
                                :class="{ active: isActive(item.to) }"
                            >
                                <Icon
                                    :icon="iconFor(item, isActive(item.to))"
                                    class="menu-icon"
                                />
                                <span>{{ item.label }}</span>
                            </router-link>

                            <!-- An entry with no `to` triggers a handler instead -->
                            <a
                                v-else
                                href="#"
                                class="waves-effect"
                                @click.prevent="onComposeClick"
                            >
                                <Icon :icon="item.icon" class="menu-icon" />
                                <span>{{ item.label }}</span>
                            </a>

                        </li>

                    </template>

                </ul>

            </div>

            <!-- Sidebar -->

        </div>

    </div>

    <!-- Left Sidebar End -->
</template>


<script setup>

import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';
import {
    computed,
    onMounted,
    onBeforeUnmount,
    nextTick,
    watch
} from 'vue';

import { useAuthStore } from '@/stores/auth';
import adminMenu from '@/nav/adminMenu';

// ------------------------------------------------------------
// State
// ------------------------------------------------------------

const authStore = useAuthStore();
const route = useRoute();

const currentPath = computed(() => route.path);

// Login already returns this list (the backend puts permissions in the same
// `user` object as first_name/last_name) and initFromLocalStorage restores that
// whole object on refresh — so there is nothing to fetch here.
const myPermissions = computed(() => authStore.user?.permissions ?? []);


// ------------------------------------------------------------
// Permission check
// ------------------------------------------------------------

/**
 * null / missing  → no gate, everyone signed in may see it.
 * an array        → ANY of, via some().
 *
 * `some()` is not a detail: the backend's EnsureAdminPermission middleware
 * passes when an admin holds at least one of the listed permissions. Using
 * `every()` here would make the menu stricter than the API — a finance admin
 * holding only tenants.suspend could fetch the tenant list in Postman but
 * would not be offered the link.
 */
function can(perms) {
    if (!perms) return true;
    return perms.some((p) => myPermissions.value.includes(p));
}

/**
 * The menu, filtered down to what this admin may see.
 *
 * Headings and dividers always survive — they are decoration, not access. A
 * group survives if ANY child is visible, so a collapsed section never opens
 * onto nothing.
 */
const menu = computed(() =>

    adminMenu
        .filter((item) => {

            if (item.heading || item.divider) return true;

            if (can(item.permissions)) return true;

            return item.children?.some((c) => can(c.permissions));

        })
        .map((item) =>
            item.children
                ? { ...item, children: item.children.filter((c) => can(c.permissions)) }
                : item
        )
);


// ------------------------------------------------------------
// Active state
// ------------------------------------------------------------

// Exact match on a leaf.
const isActive = (to) => Boolean(to) && currentPath.value === to;

/**
 * A group highlights when the current path is one of its own children.
 * Derived from the children rather than a hand-written list of paths, so
 * adding a leaf to the array cannot leave its group failing to highlight.
 */
const isGroupActive = (item) =>
    Boolean(item.children?.some((c) => c.to && c.to === currentPath.value));

// Fall back to the single icon for entries with no active-state variant.
const iconFor = (item, active) =>
    (active ? item.iconActive ?? item.icon : item.icon);


// ------------------------------------------------------------
// MetisMenu (jQuery)
// ------------------------------------------------------------

/**
 * MetisMenu is a jQuery plugin that toggles mm-active / mm-show itself. It
 * knows nothing about Vue, so this is the one place that has to be told when
 * the markup changed.
 */
const initMetisMenu = () => {

    const menuEl = document.getElementById('side-menu');

    if (!menuEl) return;

    if (window.jQuery && window.jQuery.fn.metisMenu) {

        try {

            // Dispose first. main.js re-initialises on every afterEach, and
            // binding twice makes open/close fire twice per click.
            window.jQuery(menuEl).metisMenu('dispose');

        } catch (e) {

            // Nothing was bound — that is fine.

        }

        window.jQuery(menuEl).metisMenu();

    } else {

        // Scripts load async in main.js, so jQuery may not be here yet.
        setTimeout(initMetisMenu, 100);

    }

};

/**
 * Without this, a permission arriving after mount leaves MetisMenu's classes
 * stale and an already-open group stops animating.
 */
watch(menu, () => nextTick(initMetisMenu));

onMounted(() => {

    nextTick(() => {

        initMetisMenu();

    });

});

onBeforeUnmount(() => {

    const menuEl = document.getElementById('side-menu');

    if (
        menuEl &&
        window.jQuery &&
        window.jQuery.fn.metisMenu
    ) {

        try {

            window.jQuery(menuEl).metisMenu('dispose');

        } catch (e) {

            // ignore

        }

    }

});


// ------------------------------------------------------------
// Actions
// ------------------------------------------------------------

// The compose offcanvas is mounted globally in App.vue, so it is already in the
// DOM and this only has to trigger it. "Add Contact" needs its own handler —
// it was a data-bs-target for a modal that does not exist.
const onComposeClick = () => {

    console.log('Compose clicked');

};

</script>


<style scoped>

.menu-icon {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    margin-right: 10px;
}

</style>
