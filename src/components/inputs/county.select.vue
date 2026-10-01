<template>
   <SelectSearchBox
    v-model="selectedCounty"
    :options="counties.map(county => ({
        value: county.code,
        label: county.name
    }))"
    :loading="loading"
    placeholder="Select a county"
    labelKey="label"
    valueKey="value"
/>

</template>
<script setup>
import { ref, computed, onMounted,defineProps, defineEmits, watch } from "vue";
import SelectSearchBox from "@/components/SelectSearchBox.vue";
import GEOGRAPHYAPI from "@/api/geography";

const counties=ref([])
const selectedCounty=ref(null)
const loading=ref(false)

//variables to emit to the parent component
const emit=defineEmits(['county-selected'])

async function fetchCounties(){
    loading.value=true
    try{
        const {data}=await GEOGRAPHYAPI.counties()
        counties.value=[{ code: null, name: "All Counties" }, ...data.data??[]]
        console.log("Fetched counties:",counties.value)
    }catch(error){
        console.error("Error fetching counties:",error)
    }finally{
        loading.value=false
    }
}

onMounted(()=>{
    fetchCounties()
})

watch(selectedCounty, (newCounty) => {
    emit('county-selected', newCounty)
})


</script>