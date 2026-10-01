<template>
  <div class="form-input-icon">
    <div class="position-relative">
      <input
        ref="autocompleteInput"
        v-model="formData.location"
        type="text"
        class="form-control pe-5"
        placeholder="Search for Address or Place"
        spellcheck="false"
      />
      <span class="mdi mdi-map-marker"></span>

      <!-- Clear (X) icon -->
      <i
        v-if="formData.location"
        class="position-absolute end-0 top-50 translate-middle-y me-3 text-muted cursor-pointer map-close clear-selection-map-input"
        style="cursor: pointer;"
        @click="clearLocation"
      >
        <i class="mdi mdi-close font-size16" style="font-size: 16px;"></i>
      </i>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  apiKey: {
    type: String,
    required: true,
  },
});

// ✅ Added the "location-cleared" event here
const emit = defineEmits(["location-selected", "location-cleared"]);

const formData = ref({
  location: "",
  latitude: "",
  longitude: "",
});

const autocompleteInput = ref(null);
let autocomplete = null;
let sessionToken = null;

const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps && window.google.maps.places) {
      resolve();
      return;
    }

    const existingScript = document.querySelector("#google-maps-script");
    if (existingScript) {
      existingScript.addEventListener("load", resolve);
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${props.apiKey}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const initAutocomplete = () => {
  const input = autocompleteInput.value;
  if (!input || !window.google || !window.google.maps.places) return;

  sessionToken = new google.maps.places.AutocompleteSessionToken();

  autocomplete = new google.maps.places.Autocomplete(input, {
    fields: ["formatted_address", "geometry", "name"],
    types: ["geocode", "establishment"],
    componentRestrictions: { country: "ke" },
  });

  autocomplete.setOptions({ sessionToken });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    const selectedText = input.value;

    if (place.geometry) {
      formData.value.location =
        selectedText || place.name || place.formatted_address;
      formData.value.latitude = place.geometry.location.lat();
      formData.value.longitude = place.geometry.location.lng();

      emit("location-selected", { ...formData.value });
    }

    sessionToken = new google.maps.places.AutocompleteSessionToken();
  });
};

// ✅ Clear input, coordinates, and notify parent
const clearLocation = () => {
  formData.value.location = "";
  formData.value.latitude = "";
  formData.value.longitude = "";
  emit("location-cleared");
};

onMounted(async () => {
  try {
    await loadGoogleMapsScript();
    initAutocomplete();
  } catch (error) {
    console.error("Failed to load Google Maps API:", error);
  }
});
</script>

<style scoped>
.pac-container {
  z-index: 99999 !important;
}
.form-input-icon {
  position: relative;
}
.mdi-map-marker {
  font-size: 1.2rem;
  color: #6c757d;
}
.map-close {
  right: 10px !important;
}
</style>
