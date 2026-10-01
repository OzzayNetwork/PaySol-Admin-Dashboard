<template>
    <div class="article-skeleton p-3">
        <!-- Image Placeholder -->
        <div class="skeleton skeleton-img"></div>

        <div class="p-3">
            <!-- Time Placeholder -->
            <div class="d-flex align-items-center gap-2 mb-2">
                <div class="skeleton skeleton-icon"></div>
                <div class="skeleton skeleton-line short"></div>
            </div>

            <!-- Title Placeholder -->
            <div class="skeleton skeleton-line"></div>
            <div class="skeleton skeleton-line w-75"></div>

            <!-- Description Placeholder -->
            <div class="skeleton skeleton-line w-100 mt-2"></div>
            <div class="skeleton skeleton-line w-90"></div>
            <div class="skeleton skeleton-line w-80"></div>

            <!-- Author Section -->
            <div class="d-flex align-items-center gap-3 mt-3">
                <div class="skeleton skeleton-avatar"></div>

                <div class="flex-grow-1">
                    <div class="skeleton skeleton-line short"></div>
                    <div class="skeleton skeleton-line tiny"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>



.article-skeleton {
    border: 1px solid #efefef;
    border-radius: 0px;
    overflow: hidden;
    background: #fff;
}

/* Base skeleton block */
.skeleton {
    position: relative;
    overflow: hidden;
    background: #e9e9e9;
    border-radius: 0px;
}

.skeleton::after {
    content: "";
    position: absolute;
    top: 0;
    left: -150px;
    height: 100%;
    width: 150px;

    background: linear-gradient(90deg, transparent, #f6f6f6, transparent);
    animation: shimmer 1.3s infinite;
}

@keyframes shimmer {
    0% {
        left: -150px;
    }

    100% {
        left: 100%;
    }
}

/* Different skeleton sizes */
.skeleton-img {
    height: 180px;
    width: 100%;
    border-radius: 0;
}

.skeleton-icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
}

.skeleton-line {
    height: 12px;
    margin-bottom: 8px;
}

.skeleton-line.short {
    width: 120px;
}

.skeleton-line.tiny {
    width: 90px;
}

.skeleton-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
}

/* utility widths */
.w-90 {
    width: 90%;
}

.w-80 {
    width: 80%;
}

.w-75 {
    width: 75%;
}
</style>