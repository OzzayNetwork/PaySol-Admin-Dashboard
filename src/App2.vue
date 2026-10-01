<script setup>
import { ref } from "vue";

import HelloWorld from "./components/HelloWorld.vue";
import HeaderVue from "./layouts/Header.vue";
import LoaderVue from "./layouts/Loader.vue";
import SideBar from "./layouts/Sidebar.vue";
import SelectPickrTest from "./components/SelectPickrTest.vue";
import SelectSearchBox from "./components/SelectSearchBox.vue";
import imageUploader from "./components/ImageUploader.vue";
import SingleToastVue from "./components/SingleToast.vue";
import ImageToast from "./components/ImageToast.vue";

// Reactive state
const selectedItem = ref(null);
const selectedCountry = ref([]);
const dropdownCountries = ["Kenya", "Tanzania", "Uganda", "Rwanda", "Burundi"];
const selectedFruits = ref([]);
const dropdownFruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Mango', value: 'mango' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Orange', value: 'orange' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Papaya', value: 'papaya' },
  { label: 'Guava', value: 'guava' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Peach', value: 'peach' },
  { label: 'Pear', value: 'pear' },
  { label: 'Plum', value: 'plum' },
  { label: 'Pomegranate', value: 'pomegranate' },
  { label: 'Passion Fruit', value: 'passion_fruit' },
  { label: 'Lychee', value: 'lychee' },
  { label: 'Apricot', value: 'apricot' },
  { label: 'Coconut', value: 'coconut' }
];
//const previewUrl = ref('./assets/images/users/avatar-2.jpg') // ❌ This won’t resolve correctly
import avatar from '@/assets/images/users/avatar-2.jpg'
import avatar2 from '@/assets/images/users/avatar-1.jpg'

const previewUrl = ref(avatar)
const previewUrl2 = ref(avatar2)

// 🔁 Update the preview when image is selected
function handleImageSelected(newImageUrl) {
  previewUrl.value = newImageUrl
}

function handleImageSelected2(newImageUrl) {
  previewUrl2.value = newImageUrl
}

// Toast reactive state
const showToast = ref(false);
const toastType = ref('');
const toastMessage = ref('');

// ✅ Rename incoming values to avoid shadowing
const handleToast = ({ toastType: incomingType, toastMessage: incomingMessage }) => {
  toastType.value = incomingType;
  toastMessage.value = incomingMessage;
  showToast.value = true;

  // Optional: auto-hide
  setTimeout(() => {
    showToast.value = false;
  }, 1000);
};


const selectedLanguages = ref([]);
const languageOptions = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Rust", value: "rust" },
  { label: "Swift", value: "swift" },
  { label: "Python", value: "py" },
];


</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <LoaderVue />

  <div id="layout-wrapper">
    <HeaderVue />
    <SideBar />

    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <div class="row">
            <div class="card">
              <div class="col-12">
                <div class="card-body">
                  <div class="row">
                     <div class="col-4">
                      <SingleToastVue
                        :toastType="toastType"
                        :toastMessage="toastMessage"
                      />
                        </div>
                    <div class="col-12">
                      <div class="row">
                       
                          <div class="col-4">
                            <div class="mb-2 mt-2">
                                <img class="rounded-circle avatar-xl" :src="previewUrl"  alt="">
                                <imageUploader inputId="profilePicUpload" @image-selected="handleImageSelected" @show-toast="handleToast" />

                            </div>
                            <label for="profilePicUpload" type="button" class="btn btn-light waves-effect mb-5">Change Image</label>
                          </div>

                           
                      </div>
                    </div>
                    <div class="col-4">
                      <label for="">Select Language</label>
                      <SelectSearchBox
                        v-model="selectedLanguages"
                        :options="languageOptions"
                        placeholder="Choose language(s)"
                        :is-multi="true"
                        :disabled="false"
                        input-class="form-control form-select"
                        class-name="mb-3"
                      />
                    </div>

                    <div class="col-4">
                      <label for="">Select Fruit</label>
                      <SelectSearchBox
                        v-model="selectedFruits"
                        :options="dropdownFruits"
                        placeholder="Choose fruit(s)"
                        :is-multi="false"
                        :disabled="false"
                        input-class="form-control form-select"
                        class-name="mb-3"
                      />
                    </div>

                    

                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-body">
                <ImageToast/>
              </div>
            </div>
            
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
