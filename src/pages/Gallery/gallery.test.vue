<template>
  <div class="form-input-icon">
      <div class="position-relative">
        <input 
          type="text" class="form-control" 
          placeholder="Search for Address" 
          spellcheck="false" 
          data-ms-editor="true"
          ref="autocompleteInput"
          v-model="formData.location"
        >
        <span class="mdi mdi-map-marker"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoogleLocationInput",
  props: {
    apiKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        location: "",
        latitude: "",
        longitude: "",
      },
      autocomplete: null,
    };
  },
  mounted() {
    // Load Google Maps script dynamically if not already loaded
    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = this.initAutocomplete;
      document.head.appendChild(script);
    } else {
      this.initAutocomplete();
    }
  },
  methods: {
    initAutocomplete() {
      const input = this.$refs.autocompleteInput;
      this.autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["geocode"], // only show address results
        componentRestrictions: { country: "ke" }, // restrict to Kenya (optional)
      });

      this.autocomplete.addListener("place_changed", () => {
        const place = this.autocomplete.getPlace();
        if (place.geometry) {
          this.formData.location = place.formatted_address;
          this.formData.latitude = place.geometry.location.lat();
          this.formData.longitude = place.geometry.location.lng();
          this.$emit("location-selected", this.formData);
        }
      });
    },
  },
};
</script>

<style scoped>
.pac-container {
  z-index: 99999 !important; /* ensures dropdown appears above modals */
}
.form-control:focus {
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}
</style>
