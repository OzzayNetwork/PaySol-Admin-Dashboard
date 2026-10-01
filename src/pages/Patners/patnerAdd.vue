<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Add Partner</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/partners/list">Partners</router-link>
                            </li>
                            <li class="breadcrumb-item active">Add Partner</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Page Content -->
        <div v-if="isLoading">
            <LoaderVue />
        </div>
        <div v-else class="row">
            <SingleToastVue
                :toastType="toastType"
                :toastMessage="toastMessage"
                />
            <div class="col-sm-12 col-lg-8 offset-lg-2">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">New Partner Onboarding</h4>
                        <p class="card-title-desc text-muted mb-0">
                            Register business partners to be displayed on the website's partnership page and strengthen your market presence.                        </p>
                    </div>
                    <div class="card-body">
                        <div class="row">

                             <div class="col-12">
                                <div class="d-flex">
                                     <div class="mb-0  d-flex align-items-center justify-content-center">
                                        <img class="rounded-circle avatar-xl" :src="previewUrl"  alt="">
                                        <imageUploader inputId="profilePicUpload" @image-selected="handleImageSelected" @show-toast="handleToast" :aspect-ratio="selectedRatio" />
                                    </div>

                                    <div class="d-flex align-items-center ">
                                        <div class="text-muted d-flex flex-column align-items-start justify-content-center">
                                            <h5 class="mb-1 text-black">Client's Logo</h5>
                                            <p class="">Accepted file format type is PNG or SVG. Less than 2 MB</p>
                                           
                                            <label for="profilePicUpload" type="button" class="btn btn-light waves-effect mb-0">
                                                <i class="bx font-size-16 align-middle me-2" :class="hasLogoSelected ? 'bx-revision' : 'bx-image-add'"></i> 
                                                {{ hasLogoSelected ? 'Change Logo' : 'Select Logo' }}
                                            </label>

                                        </div>
                                    </div>
                                </div>
                               
                            </div>

                            
                            <div class="col-12">
                                <hr class="opacity-25 mb-4 bg-grey">
                            </div>
                            <div class="col-6">
                                <div>
                                    <label for="partnerName" class="form-label">Partner Name</label>
                                    <input 
                                        type="text" 
                                        class="form-control mb-4" 
                                        id="partnerName" 
                                        v-model="partnerForm.name" 
                                        placeholder="Name of Organization"
                                        :class="{ 'is-invalid': validationErrors.name }"
                                        required 
                                      />
                                </div>
                            </div>

                            <div class="col-6">
                                <div>
                                    <label for="partnerAbbreviation" class="form-label">Abbreviation</label>
                                    <input type="text" class="form-control mb-4" id="partnerAbbreviation" v-model="partnerForm.abbreviation" placeholder="Enter abbreviation" />
                                </div>
                            </div>

                            <div class="col-6">
                                <div>
                                    <label for="organizationType" class="form-label">Organization Type</label>
                                    <SelectSearchBox
                                        v-model="selectedCompanyType"
                                        :options="companyTypes"
                                        placeholder="Choose Organisation Type"
                                        :is-multi="false"
                                        :disabled="false"
                                        input-class="form-control form-select"
                                        class-name="mb-3"
                                        
                                    />

                                </div>
                            </div>

                            <div class="col-6">
                                <div>
                                    <label for="partnershipType" class="form-label">Country</label>
                                     <SelectSearchBox
                                        v-model="selectedCountry"
                                        :options="dropdownCountries"
                                        placeholder="Choose Country"
                                        :is-multi="false"
                                        :disabled="false"
                                        input-class="form-control form-select"
                                        class-name="mb-3"
                                        required
                                    />
                                </div>
                            </div>

                            <div class="col-6">
                                <div>
                                    <label for="partnershipType" class="form-label">Partnership Type</label>
                                    <SelectSearchBox
                                        v-model="selectedPartnershipType"
                                        :options="partnershipTypes"
                                        placeholder="Choose Partnership Type"
                                        :is-multi="false"
                                        :disabled="false"
                                        input-class="form-control form-select"
                                        class-name="mb-3"
                                        required
                                    />
                                </div>
                            </div>

                              <div class="col-6">
                                <div>
                                    <label for="partnershipType" class="form-label">Products</label>
                                     <SelectSearchBox
                                        v-model="selectedProducts"
                                        :options="products"
                                        placeholder="Choose Product"
                                        :is-multi="true"
                                        :disabled="false"
                                        input-class="form-control form-select"
                                        class-name="mb-3"
                                        
                                    />
                                </div>
                            </div>

                            <div class="col-12">
                                <div>
                                    <label for="partnerDescription" class="form-label">Partnership Description</label>
                                    <textarea 
                                        required class="form-control mb-4" 
                                        id="partnerDescription" rows="3" 
                                        v-model="partnerForm.description" 
                                        placeholder="Enter partner description"
                                         :class="{ 'is-invalid': validationErrors.description }"
                                        >
                                    </textarea>
                                </div>
                            </div>

                            <div class="col-12">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <label>Partner Links & Website</label>
                                    <button type="button" class="btn btn-sm btn-outline-primary d-none" @click="addLink">
                                        <i class="mdi mdi-plus"></i> Add Link
                                    </button>
                                </div>
                                
                                <div v-for="(link, index) in partnerForm.links" :key="index" class="row mb-3">
                                    <div class="col-6">
                                        <input 
                                            type="url" 
                                            class="form-control" 
                                            v-model="link.url" 
                                            placeholder="https://example.com" 
                                        />
                                    </div>
                                    <div class="col-6 d-flex gap-3">
                                        <input 
                                            type="text" 
                                            class="form-control flex-grow-2 flex-grow-1 w-100" 
                                            v-model="link.title" 
                                            placeholder="Link Title eg Website" 
                                        />

                                        <div class="d-flex align-items-center">
                                        <button 
                                            type="button" 
                                            class="btn btn-outline-danger  w-auto" 
                                            @click="removeLink(index)"
                                            :disabled="partnerForm.links.length === 1"
                                        >
                                            <i class="bx bx-x font-size-16 align-middle "></i>
                                        </button>
                                    </div>
                                    </div>

                                   
                                    
                                </div>

                                 <div class="col">
                                    <button type="button" class="btn btn-link waves-effect text-black" @click="addLink">  <i class="bx bx-plus font-size-16 align-middle "></i> Add Another Link</button>
                                </div>
                            </div>

                            

                        </div>
                    </div>
                    <div class="card-footer bg-white border-top d-flex justify-content-end py-3">
                        <div class="col-12">
                                <div class="d-flex justify-content-end gap-2">
                                    <button type="button" class="btn btn-outline-secondary waves-effect"  @click="cancelForm">Cancel</button>
                                    <button type="button" class="btn btn-dark waves-effect" @click="savePartner">Save Partner</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import LoaderVue from "@/layouts/Loader.vue";
import ImageUploader from '@/components/ImageUploader.vue';
import SelectSearchBox from '@/components/SelectSearchBox.vue';
import SingleToastVue from '@/components/SingleToast.vue';

// drop down items
const dropdownCountries = [
  { label: 'Afghanistan', value: 'afghanistan' },
  { label: 'Albania', value: 'albania' },
  { label: 'Algeria', value: 'algeria' },
  { label: 'Andorra', value: 'andorra' },
  { label: 'Angola', value: 'angola' },
  { label: 'Antigua and Barbuda', value: 'antigua_and_barbuda' },
  { label: 'Argentina', value: 'argentina' },
  { label: 'Armenia', value: 'armenia' },
  { label: 'Australia', value: 'australia' },
  { label: 'Austria', value: 'austria' },
  { label: 'Azerbaijan', value: 'azerbaijan' },
  { label: 'Bahamas', value: 'bahamas' },
  { label: 'Bahrain', value: 'bahrain' },
  { label: 'Bangladesh', value: 'bangladesh' },
  { label: 'Barbados', value: 'barbados' },
  { label: 'Belarus', value: 'belarus' },
  { label: 'Belgium', value: 'belgium' },
  { label: 'Belize', value: 'belize' },
  { label: 'Benin', value: 'benin' },
  { label: 'Bhutan', value: 'bhutan' },
  { label: 'Bolivia', value: 'bolivia' },
  { label: 'Bosnia and Herzegovina', value: 'bosnia_and_herzegovina' },
  { label: 'Botswana', value: 'botswana' },
  { label: 'Brazil', value: 'brazil' },
  { label: 'Brunei', value: 'brunei' },
  { label: 'Bulgaria', value: 'bulgaria' },
  { label: 'Burkina Faso', value: 'burkina_faso' },
  { label: 'Burundi', value: 'burundi' },
  { label: 'Cabo Verde', value: 'cabo_verde' },
  { label: 'Cambodia', value: 'cambodia' },
  { label: 'Cameroon', value: 'cameroon' },
  { label: 'Canada', value: 'canada' },
  { label: 'Central African Republic', value: 'central_african_republic' },
  { label: 'Chad', value: 'chad' },
  { label: 'Chile', value: 'chile' },
  { label: 'China', value: 'china' },
  { label: 'Colombia', value: 'colombia' },
  { label: 'Comoros', value: 'comoros' },
  { label: 'Congo', value: 'congo' },
  { label: 'Costa Rica', value: 'costa_rica' },
  { label: 'Croatia', value: 'croatia' },
  { label: 'Cuba', value: 'cuba' },
  { label: 'Cyprus', value: 'cyprus' },
  { label: 'Czech Republic', value: 'czech_republic' },
  { label: 'Democratic Republic of the Congo', value: 'democratic_republic_of_the_congo' },
  { label: 'Denmark', value: 'denmark' },
  { label: 'Djibouti', value: 'djibouti' },
  { label: 'Dominica', value: 'dominica' },
  { label: 'Dominican Republic', value: 'dominican_republic' },
  { label: 'Ecuador', value: 'ecuador' },
  { label: 'Egypt', value: 'egypt' },
  { label: 'El Salvador', value: 'el_salvador' },
  { label: 'Equatorial Guinea', value: 'equatorial_guinea' },
  { label: 'Eritrea', value: 'eritrea' },
  { label: 'Estonia', value: 'estonia' },
  { label: 'Eswatini', value: 'eswatini' },
  { label: 'Ethiopia', value: 'ethiopia' },
  { label: 'Fiji', value: 'fiji' },
  { label: 'Finland', value: 'finland' },
  { label: 'France', value: 'france' },
  { label: 'Gabon', value: 'gabon' },
  { label: 'Gambia', value: 'gambia' },
  { label: 'Georgia', value: 'georgia' },
  { label: 'Germany', value: 'germany' },
  { label: 'Ghana', value: 'ghana' },
  { label: 'Greece', value: 'greece' },
  { label: 'Grenada', value: 'grenada' },
  { label: 'Guatemala', value: 'guatemala' },
  { label: 'Guinea', value: 'guinea' },
  { label: 'Guinea-Bissau', value: 'guinea_bissau' },
  { label: 'Guyana', value: 'guyana' },
  { label: 'Haiti', value: 'haiti' },
  { label: 'Honduras', value: 'honduras' },
  { label: 'Hungary', value: 'hungary' },
  { label: 'Iceland', value: 'iceland' },
  { label: 'India', value: 'india' },
  { label: 'Indonesia', value: 'indonesia' },
  { label: 'Iran', value: 'iran' },
  { label: 'Iraq', value: 'iraq' },
  { label: 'Ireland', value: 'ireland' },
  { label: 'Israel', value: 'israel' },
  { label: 'Italy', value: 'italy' },
  { label: 'Ivory Coast', value: 'ivory_coast' },
  { label: 'Jamaica', value: 'jamaica' },
  { label: 'Japan', value: 'japan' },
  { label: 'Jordan', value: 'jordan' },
  { label: 'Kazakhstan', value: 'kazakhstan' },
  { label: 'Kenya', value: 'kenya' },
  { label: 'Kiribati', value: 'kiribati' },
  { label: 'Kuwait', value: 'kuwait' },
  { label: 'Kyrgyzstan', value: 'kyrgyzstan' },
  { label: 'Laos', value: 'laos' },
  { label: 'Latvia', value: 'latvia' },
  { label: 'Lebanon', value: 'lebanon' },
  { label: 'Lesotho', value: 'lesotho' },
  { label: 'Liberia', value: 'liberia' },
  { label: 'Libya', value: 'libya' },
  { label: 'Liechtenstein', value: 'liechtenstein' },
  { label: 'Lithuania', value: 'lithuania' },
  { label: 'Luxembourg', value: 'luxembourg' },
  { label: 'Madagascar', value: 'madagascar' },
  { label: 'Malawi', value: 'malawi' },
  { label: 'Malaysia', value: 'malaysia' },
  { label: 'Maldives', value: 'maldives' },
  { label: 'Mali', value: 'mali' },
  { label: 'Malta', value: 'malta' },
  { label: 'Marshall Islands', value: 'marshall_islands' },
  { label: 'Mauritania', value: 'mauritania' },
  { label: 'Mauritius', value: 'mauritius' },
  { label: 'Mexico', value: 'mexico' },
  { label: 'Micronesia', value: 'micronesia' },
  { label: 'Moldova', value: 'moldova' },
  { label: 'Monaco', value: 'monaco' },
  { label: 'Mongolia', value: 'mongolia' },
  { label: 'Montenegro', value: 'montenegro' },
  { label: 'Morocco', value: 'morocco' },
  { label: 'Mozambique', value: 'mozambique' },
  { label: 'Myanmar', value: 'myanmar' },
  { label: 'Namibia', value: 'namibia' },
  { label: 'Nauru', value: 'nauru' },
  { label: 'Nepal', value: 'nepal' },
  { label: 'Netherlands', value: 'netherlands' },
  { label: 'New Zealand', value: 'new_zealand' },
  { label: 'Nicaragua', value: 'nicaragua' },
  { label: 'Niger', value: 'niger' },
  { label: 'Nigeria', value: 'nigeria' },
  { label: 'North Korea', value: 'north_korea' },
  { label: 'North Macedonia', value: 'north_macedonia' },
  { label: 'Norway', value: 'norway' },
  { label: 'Oman', value: 'oman' },
  { label: 'Pakistan', value: 'pakistan' },
  { label: 'Palau', value: 'palau' },
  { label: 'Palestine', value: 'palestine' },
  { label: 'Panama', value: 'panama' },
  { label: 'Papua New Guinea', value: 'papua_new_guinea' },
  { label: 'Paraguay', value: 'paraguay' },
  { label: 'Peru', value: 'peru' },
  { label: 'Philippines', value: 'philippines' },
  { label: 'Poland', value: 'poland' },
  { label: 'Portugal', value: 'portugal' },
  { label: 'Qatar', value: 'qatar' },
  { label: 'Romania', value: 'romania' },
  { label: 'Russia', value: 'russia' },
  { label: 'Rwanda', value: 'rwanda' },
  { label: 'Saint Kitts and Nevis', value: 'saint_kitts_and_nevis' },
  { label: 'Saint Lucia', value: 'saint_lucia' },
  { label: 'Saint Vincent and the Grenadines', value: 'saint_vincent_and_the_grenadines' },
  { label: 'Samoa', value: 'samoa' },
  { label: 'San Marino', value: 'san_marino' },
  { label: 'Sao Tome and Principe', value: 'sao_tome_and_principe' },
  { label: 'Saudi Arabia', value: 'saudi_arabia' },
  { label: 'Senegal', value: 'senegal' },
  { label: 'Serbia', value: 'serbia' },
  { label: 'Seychelles', value: 'seychelles' },
  { label: 'Sierra Leone', value: 'sierra_leone' },
  { label: 'Singapore', value: 'singapore' },
  { label: 'Slovakia', value: 'slovakia' },
  { label: 'Slovenia', value: 'slovenia' },
  { label: 'Solomon Islands', value: 'solomon_islands' },
  { label: 'Somalia', value: 'somalia' },
  { label: 'South Africa', value: 'south_africa' },
  { label: 'South Korea', value: 'south_korea' },
  { label: 'South Sudan', value: 'south_sudan' },
  { label: 'Spain', value: 'spain' },
  { label: 'Sri Lanka', value: 'sri_lanka' },
  { label: 'Sudan', value: 'sudan' },
  { label: 'Suriname', value: 'suriname' },
  { label: 'Sweden', value: 'sweden' },
  { label: 'Switzerland', value: 'switzerland' },
  { label: 'Syria', value: 'syria' },
  { label: 'Taiwan', value: 'taiwan' },
  { label: 'Tajikistan', value: 'tajikistan' },
  { label: 'Tanzania', value: 'tanzania' },
  { label: 'Thailand', value: 'thailand' },
  { label: 'Timor-Leste', value: 'timor_leste' },
  { label: 'Togo', value: 'togo' },
  { label: 'Tonga', value: 'tonga' },
  { label: 'Trinidad and Tobago', value: 'trinidad_and_tobago' },
  { label: 'Tunisia', value: 'tunisia' },
  { label: 'Turkey', value: 'turkey' },
  { label: 'Turkmenistan', value: 'turkmenistan' },
  { label: 'Tuvalu', value: 'tuvalu' },
  { label: 'Uganda', value: 'uganda' },
  { label: 'Ukraine', value: 'ukraine' },
  { label: 'United Arab Emirates', value: 'united_arab_emirates' },
  { label: 'United Kingdom', value: 'united_kingdom' },
  { label: 'United States', value: 'united_states' },
  { label: 'Uruguay', value: 'uruguay' },
  { label: 'Uzbekistan', value: 'uzbekistan' },
  { label: 'Vanuatu', value: 'vanuatu' },
  { label: 'Vatican City', value: 'vatican_city' },
  { label: 'Venezuela', value: 'venezuela' },
  { label: 'Vietnam', value: 'vietnam' },
  { label: 'Yemen', value: 'yemen' },
  { label: 'Zambia', value: 'zambia' },
  { label: 'Zimbabwe', value: 'zimbabwe' }
];

const companyTypes = [
  { label: 'Sole Proprietorship', value: 'sole_proprietorship' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Limited Liability Company (LLC)', value: 'llc' },
  { label: 'Corporation', value: 'corporation' },
  { label: 'Cooperative', value: 'cooperative' },
  { label: 'Non-Profit Organization', value: 'non_profit' },
  { label: 'Public Company', value: 'public_company' },
  { label: 'Private Company', value: 'private_company' },
  { label: 'Joint Venture', value: 'joint_venture' },
  { label: 'Branch Office', value: 'branch_office' },
  { label: 'Representative Office', value: 'representative_office' },
  { label: 'Franchise', value: 'franchise' }
];

const partnershipTypes = [
  { label: 'General Partnership', value: 'general_partnership' },
  { label: 'Limited Partnership', value: 'limited_partnership' },
  { label: 'Limited Liability Partnership (LLP)', value: 'llp' },
  { label: 'Strategic Partnership', value: 'strategic_partnership' },
  { label: 'Joint Venture Partnership', value: 'joint_venture_partnership' },
  { label: 'Technology Partnership', value: 'technology_partnership' },
  { label: 'Distribution Partnership', value: 'distribution_partnership' },
  { label: 'Marketing Partnership', value: 'marketing_partnership' },
  { label: 'Supply Chain Partnership', value: 'supply_chain_partnership' },
  { label: 'Financial Partnership', value: 'financial_partnership' },
  { label: 'Equity Partnership', value: 'equity_partnership' },
  { label: 'Channel Partnership', value: 'channel_partnership' }
];

const products = [
  { label: 'Software Development', value: 'software_development' },
  { label: 'Mobile Applications', value: 'mobile_applications' },
  { label: 'Web Development', value: 'web_development' },
  { label: 'Cloud Services', value: 'cloud_services' },
  { label: 'Digital Marketing', value: 'digital_marketing' },
  { label: 'E-commerce Solutions', value: 'ecommerce_solutions' },
  { label: 'Business Intelligence', value: 'business_intelligence' },
  { label: 'Data Analytics', value: 'data_analytics' },
  { label: 'Cybersecurity', value: 'cybersecurity' },
  { label: 'IT Consulting', value: 'it_consulting' },
  { label: 'System Integration', value: 'system_integration' },
  { label: 'Database Management', value: 'database_management' },
  { label: 'Network Solutions', value: 'network_solutions' },
  { label: 'Hardware Sales', value: 'hardware_sales' },
  { label: 'Technical Support', value: 'technical_support' }
];

// Selected items - these would be reactive variables
const selectedCountry = ref("");
const selectedCompanyType = ref("");
const selectedPartnershipType = ref("");
const selectedProducts = ref([]); // Array for multiple product selection

// uploading image scripts
//const previewUrl = ref('./assets/images/users/avatar-2.jpg') // ❌ This won’t resolve correctly
import avatar from '@/assets/images/image-placeholder.jpg'
import avatar2 from '@/assets/images/users/avatar-1.jpg'

const selectedRatio = ref(null); 

const previewUrl = ref(avatar)
const previewUrl2 = ref(avatar2)

// 🔁 Update the preview when image is selected
function handleImageSelected(newImageUrl) {
  previewUrl.value = newImageUrl
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

const hasLogoSelected = computed(() => {
  return previewUrl.value !== avatar; // Returns true if a different image is selected
});


// Define component name and meta (this syntax is for Vue 3.3+)
defineOptions({
  name: "AddPartner",
  meta: { title: 'Add Partner' }
});

const isLoading = ref(true);
const router = useRouter();

// Form data
const partnerForm = ref({
  name: '',
  abbreviation: '',
  organizationType: '',
  partnershipType: '',
  description: '',
  links: [
    { url: '', title: '' }
  ]
});

const validationErrors = ref({
  name: false,
  description: false,
  country: false,
  partnershipType: false
});


// Methods
const addLink = () => {
  partnerForm.value.links.push({ url: '', title: '' });
};

const removeLink = (index) => {
  if (partnerForm.value.links.length > 1) {
    partnerForm.value.links.splice(index, 1);
  }
};

const savePartner = () => {
  // Reset all errors
  validationErrors.value = {
    name: false,
    description: false,
    country: false,
    partnershipType: false
  };

  // Validate required fields
  let hasError = false;

  if (!partnerForm.value.name) {
    validationErrors.value.name = true;
    hasError = true;
  }
  if (!partnerForm.value.description) {
    validationErrors.value.description = true;
    hasError = true;
  }
  if (!selectedCountry.value) {
    validationErrors.value.country = true;
    hasError = true;
  }
  if (!selectedPartnershipType.value) {
    validationErrors.value.partnershipType = true;
    hasError = true;
  }

  if (hasError) {
    handleToast({
      toastType: 'error',
      toastMessage: 'Please fill all required fields before saving.'
    });
    return;
  }

  // Filter out empty links
  const validLinks = partnerForm.value.links.filter(link => link.url && link.title);

  const partnerData = {
    ...partnerForm.value,
    country: selectedCountry.value,
    partnershipType: selectedPartnershipType.value,
    companyType: selectedCompanyType.value,
    products: selectedProducts.value,
    links: validLinks
  };

  console.log('Saving partner:', partnerData);
  router.push('/partners/list');
};


const cancelForm = () => {
  router.push('/partners/list');
};

onMounted(() => {
  // Set page title
  document.title = 'Add Partner - CSPL CRM';
  
  // Simulate loading time or wait for data to load
  setTimeout(() => {
    isLoading.value = false;
  }, 1000); // Adjust timing as needed
});
</script>

<style>
/* Add your styles here */
</style>