<template>
    <SelectSearchBox
        v-model="selectedSubcounty"
        :options="subcounties.map(subcounty => ({
            value: subcounty.id,
            label: subcounty.name
        }))"
        :loading="loading"
        placeholder="Select a subcounty"
        labelKey="label"
        valueKey="value"
    />
</template>

<script setup>
import { ref, onMounted, defineEmits, watch } from "vue";
import SelectSearchBox from "@/components/SelectSearchBox.vue";
import GEOGRAPHYAPI from "@/api/geography";

// A numeric county id. The three-digit county code is a lookup label, not a
// key: /counties/{county} is bound with whereNumber() and resolves by id.
const props = defineProps({
    countyId: {
        type: [String, Number],
        required: true
    }
});

const emit = defineEmits(["subcounty-selected"]);

const subcounties = ref([]);
const selectedSubcounty = ref(null);
const loading = ref(false);

async function fetchSubcounties() {
    if (!props.countyId) {
        return;
    }


    loading.value = true;

    try {
        const { data } = await GEOGRAPHYAPI.subcounties(props.countyId);

        subcounties.value = [
            { id: null, name: "All Subcounties" },
            ...(data.data ?? [])
        ];

        //console.log("Fetched subcounties:", subcounties.value);

    } catch (error) {
        //console.error("Error fetching subcounties:", error);

    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchSubcounties();
});

watch(
    () => props.countyId,
    (newCountyId) => {
        selectedSubcounty.value = null;

        if (newCountyId) {
            fetchSubcounties();
        } else {
            subcounties.value = [];
        }
    }
);

watch(selectedSubcounty, (newSubcounty) => {
    emit("subcounty-selected", newSubcounty);
});
</script>