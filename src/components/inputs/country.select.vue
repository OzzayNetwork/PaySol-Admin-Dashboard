<template>
    <SelectSearchBox
        v-model="selectedCountry"
        :options="countryOptions"
        placeholder="Select Country"
        searchable
        clearable
        show-images
        :image-key="'flag'"
    />
</template>

<script setup>
import { ref, computed, onMounted,defineProps, defineEmits, watch } from "vue";

import SelectSearchBox from "@/components/SelectSearchBox.vue";
import geographyApi from "@/api/geography";

import DefaultFlagImage from "@/assets/images/icons/flag-default.png";

const props=defineProps({
    showPhoneCode: { type: Boolean, default: false },
    showFlag: { type: Boolean, default: true },
    showEmoji: { type: Boolean, default: false },
    showIso2: { type: Boolean, default: false },
    showIso3: { type: Boolean, default: false },
    isLightWeightAPi: { type: Boolean, default: true },
})

const countries = ref([]);
const selectedCountry = ref(null);
const loading = ref(false);

//defining variables to emit to the parent component
const emit = defineEmits(['country-selected'])

const countryOptions = computed(() =>
    countries.value.map(country => ({
       label: (props.showPhoneCode ? '(' + country.phone_code + ') ' : '') + country.name,
        value: country.iso2,

        // Extra data
        phoneCode: country.phone_code,
        flag: (props.showFlag ? country.flag_svg_url || DefaultFlagImage : null),
        emoji: country.flag_emoji,
        iso2: country.iso2,
        iso3: country.iso3,
        name: country.name,
        dbTbId: country.id, // Assuming the API returns an 'id' field for each country


        // Keep original object if needed later
        data: country
    }))
);

async function fetchCountries() {
    loading.value = true;

    try {
        if (props.isLightWeightAPi) {
            const { data } = await geographyApi.countriesLightweight();
            countries.value = data.data ?? [];
            console.log("Fetched countries:", countries.value);
        } else {
            const { data } = await geographyApi.countries();
            countries.value = data.data ?? [];
            console.log("Fetched countries:", countries.value);
        }
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
}

onMounted(fetchCountries);

watch(selectedCountry, (value) => {
    if (!value) return

    const country = countryOptions.value.find(
        option => option.value === value
    )

    if (country) {
        emit('country-selected', country)
    }
})

</script>

