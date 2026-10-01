<template>
    <SelectSearchBox
        v-model="selectedSubcounty"
        :options="subcounties.map(subcounty => ({
            value: subcounty.code,
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

const props = defineProps({
    countyCode: {
        type: [String, Number],
        required: true
    }
});

const emit = defineEmits(["subcounty-selected"]);

const subcounties = ref([]);
const selectedSubcounty = ref(null);
const loading = ref(false);

async function fetchSubcounties() {
    if (!props.countyCode) {
        return;
    }


    loading.value = true;

    try {
        const { data } = await GEOGRAPHYAPI.subcounties(
            props.countyCode
        );

        subcounties.value = [
            { code: null, name: "All Subcounties" },
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
    () => props.countyCode,
    (newCountyCode) => {
        selectedSubcounty.value = null;

        if (newCountyCode) {
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