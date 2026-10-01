<template>
  <div>
    <!-- Input field for the Tagify component -->
    <input ref="tagInputRef" class="w-100 border-top-0 border-left-0 border-0 right-0 form-control border-radius-0 px-3 py-2" placeholder="TO:" />
  </div>
</template>


<script setup>
// Import necessary Vue 3 composition API functions
import { onMounted, onBeforeUnmount, ref } from 'vue'
// Import Tagify library for tag input functionality
import Tagify from '@yaireo/tagify'
// Import Tagify's default CSS styles
import '@yaireo/tagify/dist/tagify.css'

// Create a reference to the input element for Tagify initialization
const tagInputRef = ref(null)
// Variable to store the Tagify instance
let tagifyInstance = null

// ========== VUE PROPS AND EMITS ==========
// Define component emits for parent communication
const emit = defineEmits(['contactsSelected'])

// ========== TEMPLATE FUNCTIONS ==========
// These functions define how different parts of the Tagify component are rendered

/**
 * Template for individual tag items when they are selected/added
 * @param {Object} tagData - Data object containing tag information (name, email, avatar, etc.)
 * @returns {string} HTML string for the tag element
 */
function tagTemplate(tagData) {
  return `
    <tag title="${tagData.email}"
          contenteditable='false'
          spellcheck='false'
          tabIndex="-1"
          class="tagify__tag ${tagData.class ? tagData.class : ""}"
          ${this.getAttributes(tagData)}>
        <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
        <div>
            <div class='tagify__tag__avatar-wrap'>
                <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
            </div>
            <span class='tagify__tag-text'>${tagData.name}</span>
        </div>
    </tag>
  `
}

/**
 * Template for individual items in the dropdown suggestion list
 * @param {Object} tagData - Data object containing suggestion information
 * @returns {string} HTML string for the dropdown item
 */
function suggestionItemTemplate(tagData) {
  return `
    <div ${this.getAttributes(tagData)}
        class='tagify__dropdown__item ${tagData.class ? tagData.class : ""}'
        tabindex="0"
        role="option">
        ${tagData.avatar ? `
            <div class='tagify__dropdown__item__avatar-wrap '>
                <img onerror="this.style.visibility='hidden'"  src="${tagData.avatar}">
            </div>` : ''}
        <div class="contact-info">
            <strong>${tagData.name}</strong>
            <p class="m-0 p-0">
              <span class="contact-email">${tagData.email}, </span>
              <span class="contact-phone">${tagData.phone}</span>
              <span class="contact-group d-none">${tagData.contactGroup}</span>
            </p>
        </div>
    </div>
  `
}

/**
 * Template for the dropdown header section (contains "Add All" and "Remove All" options)
 * @param {Array} suggestions - Array of available suggestions
 * @returns {string} HTML string for the header section
 */
function dropdownHeaderTemplate(suggestions) {
  return `
    <header data-selector='tagify-suggestions-header' class="${this.settings.classNames.dropdownItem} ${this.settings.classNames.dropdownItem}__addAll">
        <strong style='grid-area: add'>${this.value.length ? `Add Remaining` : 'Add All'}</strong>
        <span style='grid-area: remaning'>${suggestions.length} members</span>
        <a class='remove-all-tags btn btn-danger text-uppercase btn-sm'>Remove all</a>
    </header>
  `
}

// ========== UTILITY HELPER FUNCTIONS ==========

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} s - String to escape
 * @returns {string} Escaped string safe for HTML insertion
 */
function escapeHTML(s) {
  return typeof s === 'string'
    ? s
        .replace(/&/g, '&amp;')    // Replace & with &amp;
        .replace(/</g, '&lt;')     // Replace < with &lt;
        .replace(/>/g, '&gt;')     // Replace > with &gt;
        .replace(/"/g, '&quot;')   // Replace " with &quot;
        .replace(/`|'/g, '&#039;') // Replace ` and ' with &#039;
    : s
}

/**
 * Validates if a string is a properly formatted email address
 * @param {string} email - Email string to validate
 * @returns {boolean} True if valid email format, false otherwise
 */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Parses a full value string like "John Doe <john@example.com>" into name and email parts
 * @param {string} value - Full value string to parse
 * @returns {Object} Object with name and email properties
 */
function parseFullValue(value) {
  const parts = value.split(/<(.*?)>/g)  // Split on angle brackets
  const name = parts[0].trim()           // First part is the name
  const email = parts[1]?.replace(/<(.*?)>/g, '').trim()  // Second part is email (remove brackets)
  return { name, email }
}

/**
 * Emits selected contacts data to parent component
 * Extracts all relevant contact information for parent processing
 */
function emitContactsToParent() {
  if (!tagifyInstance) return
  
  // Get current selected tags
  const selectedTags = tagifyInstance.value || []
  
  // Map tags to contact data with all required fields
  const contactsData = selectedTags.map(tag => ({
    id: tag.value || tag.id,           // Contact ID
    name: tag.name,                    // Contact name
    email: tag.email,                  // Contact email
    phone: tag.phone,                  // Contact phone number
    contactGroup: tag.contactGroup     // Contact group (Parents, Teachers, etc.)
  }))
  
  console.log('Emitting contacts to parent:', contactsData)
  
  // Emit the contacts data to parent component
  emit('contactsSelected', contactsData)
}

// ========== DATA: AVAILABLE CONTACTS ==========
/**
 * Array of available contacts that can be selected as tags
 * Each contact has: value (ID), name, avatar (image URL), email, phone, and contactGroup assignment
 * Organized by school roles: Parents, Teachers, Suppliers, Students, Staff, etc.
 */
const whitelist = [
  // ========== PARENTS ==========
  {
    value: 1,
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/80?img=1',
    email: 'sarah.johnson@gmail.com',
    phone: '+1-555-0101',
    contactGroup: 'Parents'
  },
  {
    value: 2,
    name: 'Michael Davis',
    avatar: 'https://i.pravatar.cc/80?img=2',
    email: 'michael.davis@yahoo.com',
    phone: '+1-555-0102',
    contactGroup: 'Parents'
  },
  {
    value: 3,
    name: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/80?img=3',
    email: 'emma.wilson@hotmail.com',
    phone: '+1-555-0103',
    contactGroup: 'Parents'
  },
  {
    value: 4,
    name: 'Robert Martinez',
    avatar: 'https://i.pravatar.cc/80?img=4',
    email: 'robert.martinez@gmail.com',
    phone: '+1-555-0104',
    contactGroup: 'Parents'
  },
  {
    value: 5,
    name: 'Lisa Anderson',
    avatar: 'https://i.pravatar.cc/80?img=5',
    email: 'lisa.anderson@outlook.com',
    phone: '+1-555-0105',
    contactGroup: 'Parents'
  },

  // ========== TEACHERS ==========
  {
    value: 6,
    name: 'Dr. James Thompson',
    avatar: 'https://i.pravatar.cc/80?img=6',
    email: 'j.thompson@school.edu',
    phone: '+1-555-0201',
    contactGroup: 'Teachers'
  },
  {
    value: 7,
    name: 'Ms. Maria Rodriguez',
    avatar: 'https://i.pravatar.cc/80?img=7',
    email: 'm.rodriguez@school.edu',
    phone: '+1-555-0202',
    contactGroup: 'Teachers'
  },
  {
    value: 8,
    name: 'Mr. David Chen',
    avatar: 'https://i.pravatar.cc/80?img=8',
    email: 'd.chen@school.edu',
    phone: '+1-555-0203',
    contactGroup: 'Teachers'
  },
  {
    value: 9,
    name: 'Mrs. Jennifer Brown',
    avatar: 'https://i.pravatar.cc/80?img=9',
    email: 'j.brown@school.edu',
    phone: '+1-555-0204',
    contactGroup: 'Teachers'
  },

  // ========== SUPPLIERS ==========
  {
    value: 10,
    name: 'ABC Office Supplies',
    avatar: 'https://i.pravatar.cc/80?img=10',
    email: 'orders@abcoffice.com',
    phone: '+1-555-0301',
    contactGroup: 'Suppliers'
  },
  {
    value: 11,
    name: 'Tech Solutions Inc',
    avatar: 'https://i.pravatar.cc/80?img=11',
    email: 'sales@techsolutions.com',
    phone: '+1-555-0302',
    contactGroup: 'Suppliers'
  },
  {
    value: 12,
    name: 'School Lunch Catering',
    avatar: 'https://i.pravatar.cc/80?img=12',
    email: 'catering@schoollunch.com',
    phone: '+1-555-0303',
    contactGroup: 'Suppliers'
  },
  {
    value: 13,
    name: 'Clean & Green Maintenance',
    avatar: 'https://i.pravatar.cc/80?img=13',
    email: 'service@cleangreen.com',
    phone: '+1-555-0304',
    contactGroup: 'Suppliers'
  },

  // ========== STUDENTS ==========
  {
    value: 14,
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/80?img=14',
    email: 'alex.johnson@student.school.edu',
    phone: '+1-555-0401',
    contactGroup: 'Students'
  },
  {
    value: 15,
    name: 'Sophie Davis',
    avatar: 'https://i.pravatar.cc/80?img=15',
    email: 'sophie.davis@student.school.edu',
    phone: '+1-555-0402',
    contactGroup: 'Students'
  },
  {
    value: 16,
    name: 'Marcus Wilson',
    avatar: 'https://i.pravatar.cc/80?img=16',
    email: 'marcus.wilson@student.school.edu',
    phone: '+1-555-0403',
    contactGroup: 'Students'
  },

  // ========== STAFF ==========
  {
    value: 17,
    name: 'Helen Carter (Principal)',
    avatar: 'https://i.pravatar.cc/80?img=17',
    email: 'h.carter@school.edu',
    phone: '+1-555-0501',
    contactGroup: 'Staff'
  },
  {
    value: 18,
    name: 'Thomas Miller (Librarian)',
    avatar: 'https://i.pravatar.cc/80?img=18',
    email: 't.miller@school.edu',
    phone: '+1-555-0502',
    contactGroup: 'Staff'
  },
  {
    value: 19,
    name: 'Nancy White (Nurse)',
    avatar: 'https://i.pravatar.cc/80?img=19',
    email: 'n.white@school.edu',
    phone: '+1-555-0503',
    contactGroup: 'Staff'
  },
  {
    value: 20,
    name: 'Kevin Garcia (IT Support)',
    avatar: 'https://i.pravatar.cc/80?img=20',
    email: 'k.garcia@school.edu',
    phone: '+1-555-0504',
    contactGroup: 'Staff'
  },

  // ========== BOARD MEMBERS ==========
  {
    value: 21,
    name: 'Margaret Foster',
    avatar: 'https://i.pravatar.cc/80?img=21',
    email: 'm.foster@schoolboard.org',
    phone: '+1-555-0601',
    contactGroup: 'Board Members'
  },
  {
    value: 22,
    name: 'Richard Taylor',
    avatar: 'https://i.pravatar.cc/80?img=22',
    email: 'r.taylor@schoolboard.org',
    phone: '+1-555-0602',
    contactGroup: 'Board Members'
  }
]

/**
 * Function to add all members from a specific contact group to the tag input
 * @param {string} contactGroupName - Name of the contact group whose members should be added
 */
function addContactGroupMembers(contactGroupName) {
  console.log('Adding all contacts from contact group:', contactGroupName)
  
  // Filter whitelist to get only contacts from the specified contact group
  const groupContacts = whitelist.filter(contact => contact.contactGroup === contactGroupName)
  console.log('Contact group contacts:', groupContacts)
  
  // Get currently selected tags to avoid duplicates
  const currentValues = tagifyInstance.value || []
  // Extract emails/names from current tags for comparison
  const currentEmails = currentValues.map(tag => tag.email || tag.value || tag.name)
  console.log('Current emails:', currentEmails)
  
  // Filter out contacts that are already selected
  const contactsToAdd = groupContacts.filter(contact => 
    !currentEmails.includes(contact.email) && 
    !currentEmails.includes(contact.value) &&
    !currentEmails.includes(contact.name)
  )
  console.log('Contacts to add:', contactsToAdd)
  
  // Add each new contact as a tag
  if (contactsToAdd.length > 0) {
    contactsToAdd.forEach(contact => {
      tagifyInstance.addTags([contact])  // Add individual contact as tag
    })
    console.log('Added contacts successfully')
    
    // Emit updated contacts to parent after adding
    setTimeout(() => emitContactsToParent(), 100)
  } else {
    console.log('No new contacts to add for this contact group')
  }
}

// ========== VUE LIFECYCLE: COMPONENT INITIALIZATION ==========
onMounted(() => {
  // Initialize Tagify instance when component is mounted to the DOM
  tagifyInstance = new Tagify(tagInputRef.value, {
    tagTextProp: 'name',           // Use 'name' property as the display text for tags
    skipInvalid: true,             // Skip invalid entries instead of showing errors
    dropdown: {
      closeOnSelect: false,        // Keep dropdown open after selecting an item
      enabled: 0,                  // Show dropdown immediately (0 characters needed)
      classname: 'users-list',     // Custom CSS class for styling
      searchKeys: ['name', 'email', 'phone', 'contactGroup'] // Search through name, email, phone, and contactGroup fields
    },
    templates: {
      tag: tagTemplate,                    // Use our custom tag template
      dropdownItem: suggestionItemTemplate, // Use our custom dropdown item template
      dropdownHeader: dropdownHeaderTemplate // Use our custom header template
    },
    whitelist,                     // Provide the list of available contacts
    
    /**
     * Transform tag data before creating a tag
     * Parses full name+email strings into separate fields
     */
    transformTag(tagData) {
      const { name, email } = parseFullValue(tagData.name)
      tagData.name = name
      tagData.email = email || tagData.email
    },
    
    /**
     * Validate tag data before allowing it to be added
     * Ensures both name and valid email are present
     */
    validate({ name, email }) {
      // If no email but name exists, try to parse it
      if (!email && name) {
        const parsed = parseFullValue(name)
        name = parsed.name
        email = parsed.email
      }

      // Validation rules
      if (!name) return 'Missing name'
      if (!validateEmail(email)) return 'Invalid email'

      return true  // Validation passed
    }
  })

  /**
   * Override Tagify's dropdown HTML generation to create grouped layout
   * This function organizes contacts by contactGroup and adds "Add All" buttons for each group
   */
  tagifyInstance.dropdown.createListHTML = function(suggestionsList) {
    // Store reference to tagify instance to avoid 'this' binding issues
    const tagifyRef = tagifyInstance
    
    // Group suggestions by contact group
    const grouped = suggestionsList.reduce((acc, suggestion) => {
      const contactGroup = suggestion.contactGroup || 'Not Assigned'  // Default group if none specified
      if (!acc[contactGroup]) acc[contactGroup] = [suggestion]        // Create new group array
      else acc[contactGroup].push(suggestion)                         // Add to existing group array
      return acc
    }, {})

    /**
     * Helper function to render individual contact group members as dropdown items
     * @param {Array} groupUsers - Array of users in a specific contact group
     * @returns {string} HTML string of all group member items
     */
    const renderGroup = (groupUsers) =>
      groupUsers
        .map((suggestion) => {
          // Ensure suggestion is an object
          if (typeof suggestion === 'string' || typeof suggestion === 'number') {
            suggestion = { value: suggestion }
          }

          // Get mapped value using Tagify's internal method
          const value = tagifyRef.dropdown.getMappedValue.call(tagifyRef, suggestion)
          // Escape HTML to prevent XSS
          suggestion.value = value && typeof value === 'string' ? escapeHTML(value) : value

          // Apply the dropdown item template
          return tagifyRef.settings.templates.dropdownItem.apply(tagifyRef, [suggestion])
        })
        .join('')

    // Generate HTML for each contact group
    return Object.entries(grouped)
      .map(
        ([contactGroup, groupUsers]) =>
          `<div class="tagify__dropdown__itemsGroup" 
                data-title="Contact Group: ${contactGroup}" 
                data-contact-group="${contactGroup}">
            <div class="group-header" data-contact-group="${contactGroup}">
              <span class="group-title">Contact Group: ${contactGroup}</span>
              <span class="add-group-btn btn btn-success btn-sm opacity-1" data-contact-group="${contactGroup}">+ Add All (${groupUsers.length})</span>
            </div>
            ${renderGroup(groupUsers)}
          </div>`
        ).join('')
  }

  /**
   * Set up event listeners when dropdown is shown
   * This handles the "Add All" button functionality for each contact group
   */
  tagifyInstance.on('dropdown:show', () => {
    console.log('🔍 Dropdown show event triggered')
    
    // Wait for DOM to be fully rendered before attaching listeners
    setTimeout(() => {
      const dropdown = tagifyInstance.DOM.dropdown
      console.log('🔍 Dropdown element:', dropdown)
      
      if (dropdown) {
        console.log('✅ Dropdown found, looking for add-group-btn elements')
        
        // Find all "Add All" buttons in the dropdown
        const addGroupBtns = dropdown.querySelectorAll('.add-group-btn')
        console.log('🔍 Found add-group-btn elements:', addGroupBtns.length, addGroupBtns)
        
        // Attach click listeners to each "Add All" button
        addGroupBtns.forEach((btn, index) => {
          console.log(`🔗 Adding listener to button ${index}:`, btn)
          
          // Remove any existing listener to prevent duplicates
          if (btn._clickHandler) {
            btn.removeEventListener('click', btn._clickHandler)
          }
          
          // Create click handler for this button
          btn._clickHandler = function(e) {
            console.log('🎯 Direct button click!', this)
            e.preventDefault()                          // Prevent default behavior
            e.stopPropagation()                         // Stop event bubbling
            const contactGroupName = this.getAttribute('data-contact-group')  // Get contact group name from button
            console.log('👥 Contact group name:', contactGroupName)
            addContactGroupMembers(contactGroupName)   // Add all contact group members
          }
          
          // Add click listener with capture to bypass Tagify's event blocking
          btn.addEventListener('click', btn._clickHandler, { capture: true })
          
          // Also add mousedown as backup (some libraries block click but not mousedown)
          btn._mousedownHandler = function(e) {
            console.log('🖱️ Mousedown on button!', this)
            e.preventDefault()
            e.stopPropagation()
            const contactGroupName = this.getAttribute('data-contact-group')
            addContactGroupMembers(contactGroupName)
          }
          btn.addEventListener('mousedown', btn._mousedownHandler)
          
          console.log(`✅ Click and mousedown listeners added to button ${index}`)
        })
        
        // Set up backup general click handler on the entire dropdown
        if (dropdown._groupClickHandler) {
          dropdown.removeEventListener('click', dropdown._groupClickHandler)
        }
        
        // General click handler as fallback
        dropdown._groupClickHandler = function(e) {
          console.log('🖱️ General dropdown click (backup)', e.target)
          
          // Check if clicked element has the add-group-btn class
          if (e.target.classList.contains('add-group-btn')) {
            console.log('🎯 Backup handler triggered!')
            e.preventDefault()
            e.stopPropagation()
            const contactGroupName = e.target.getAttribute('data-contact-group')
            addContactGroupMembers(contactGroupName)
          }
        }
        
        // Add backup handler with capture to intercept events early
        dropdown.addEventListener('click', dropdown._groupClickHandler, { capture: true })
        console.log('✅ Backup handler added with capture')
        
      } else {
        console.log('❌ Dropdown element not found!')
      }
    }, 100) // 100ms delay to ensure DOM is ready
  })

  /**
   * Handle selection events from the dropdown
   * This manages the main "Add All" and "Remove All" functionality
   */
  tagifyInstance.on('dropdown:select', (e) => {
    const el = e.detail.elm    // The clicked element
    
    // Handle "Remove all tags" link
    if (e.detail.event.target.matches('.remove-all-tags')) {
      tagifyInstance.removeAllTags()
      // Emit empty array to parent when all tags are removed
      setTimeout(() => emitContactsToParent(), 100)
    } 
    // Handle main "Add All" header button (adds all available contacts)
    else if (el.classList.contains(`${tagifyInstance.settings.classNames.dropdownItem}__addAll`)) {
      tagifyInstance.dropdown.selectAll()
      // Emit updated contacts to parent after adding all
      setTimeout(() => emitContactsToParent(), 100)
    }
  })

  /**
   * Handle tag editing events
   * When user starts editing a tag, show the full "Name <email>" format
   */
  tagifyInstance.on('edit:start', ({ detail: { tag, data } }) => {
    tagifyInstance.setTagTextNode(tag, `${data.name} <${data.email}>`)
  })

  /**
   * Handle when tags are added or removed
   * Emit updated contact list to parent component
   */
  tagifyInstance.on('add', () => {
    setTimeout(() => emitContactsToParent(), 100)
  })

  tagifyInstance.on('remove', () => {
    setTimeout(() => emitContactsToParent(), 100)
  })
})

// ========== VUE LIFECYCLE: CLEANUP ==========
/**
 * Clean up Tagify instance when component is destroyed
 * Prevents memory leaks and removes event listeners
 */
onBeforeUnmount(() => {
  if (tagifyInstance) {
    tagifyInstance.destroy()  // Properly destroy Tagify instance
  }
})
</script>

<style>
/* ========== GLOBAL STYLES ========== */
body{
    /* font-family: 'Roboto', sans-serif; */
}

/* ========== MAIN TAGIFY CONTAINER ========== */
.tagify{    
    width: 100%;                    /* Full width */
    max-width: 100%;               /* Prevent overflow */
    background: rgba(white, .8);   /* Semi-transparent white background */
}

/* ========== CSS CUSTOM PROPERTIES (VARIABLES) ========== */
:root {
    --tagify-dd-item-pad: .5em 1em;  /* Padding for dropdown items */
}

/* ========== DROPDOWN ITEMS LAYOUT ========== */
/* Grid layout for dropdown items with avatar and contact info */
.tagify__dropdown.users-list .tagify__dropdown__item{
    display: grid;
    grid-template-columns: auto 1fr;    /* Auto-width avatar column, flexible info column */
    gap: 0 1em;                         /* 1em gap between columns */
    grid-template-areas: "avatar info"; /* Define grid areas */
}

/* ========== CONTACT INFO LAYOUT ========== */
/* Flexbox layout for contact information (name, email, phone, contactGroup) */
.tagify__dropdown.users-list .contact-info {
    grid-area: info;                    /* Place in info grid area */
    display: flex;                      /* Flexbox layout */
    flex-direction: column;             /* Stack items vertically */
    justify-content: center;            /* Center content vertically */
    gap: 2px;                          /* Small gap between items */
}

/* ========== CONTACT TEXT STYLING ========== */
/* Style for contact name */
.tagify__dropdown.users-list .contact-info strong {
    font-size: 1em;                    /* Normal size for name */
    color: #333;                       /* Dark text color */
    margin: 0;                         /* Remove default margin */
}

/* Style for contact email */
.tagify__dropdown.users-list .contact-email {
    font-size: 0.85em;                 /* Smaller than name */
    color: #666;                       /* Medium gray */
    opacity: 0.8;                      /* Slightly transparent */
}

/* Style for contact phone */
.tagify__dropdown.users-list .contact-phone {
    font-size: 0.8em;                  /* Smaller than email */
    color: #888;                       /* Light gray */
    opacity: 0.7;                      /* More transparent */
    font-family: monospace;            /* Monospace for phone numbers */
}

/* Style for contact group */
.tagify__dropdown.users-list .contact-group {
    font-size: 0.75em;                 /* Smallest text */
    color: #007bff;                    /* Blue color for contact group */
    font-weight: 600;                  /* Semi-bold */
    text-transform: uppercase;         /* Uppercase for emphasis */
    letter-spacing: 0.5px;             /* Slight letter spacing */
    background: rgba(0, 123, 255, 0.1); /* Light blue background */
    padding: 2px 6px;                  /* Small padding */
    border-radius: 3px;                /* Rounded corners */
    align-self: flex-start;            /* Align to start of flex container */
    margin-top: 2px;                   /* Small top margin */
}

/* ========== DROPDOWN HEADER LAYOUT ========== */
/* Grid layout for the main header (Add All / Remove All section) */
.tagify__dropdown.users-list header.tagify__dropdown__item{
    grid-template-areas: "add remove-tags"   /* Header has add and remove areas */
                        "remaning .";        /* Remaining count spans left, right is empty */
}

/* ========== AVATAR HOVER EFFECTS ========== */
/* Scale up avatar on hover for visual feedback */
.tagify__dropdown.users-list .tagify__dropdown__item:hover .tagify__dropdown__item__avatar-wrap{
    transform: scale(1.2);
}

/* ========== AVATAR STYLING ========== */
/* Circular avatar container with transitions */
.tagify__dropdown.users-list .tagify__dropdown__item__avatar-wrap{
    grid-area: avatar;              /* Place in avatar grid area */
    width: 36px;
    height: 36px;
    border-radius: 50%;             /* Make circular */
    overflow: hidden;               /* Hide image overflow */
    background: #EEE;               /* Fallback background color */
    transition: .1s ease-out;       /* Smooth transition for hover effects */
}

/* ========== IMAGE STYLING ========== */
/* Ensure images fill their containers properly */
.tagify__dropdown.users-list img{
    width: 100%;
    vertical-align: top;            /* Prevent baseline spacing issues */
}

/* ========== TEXT CONTENT STYLING ========== */
/* Style for name text in dropdown header */
.tagify__dropdown.users-list header.tagify__dropdown__item > div,
.tagify__dropdown.users-list header.tagify__dropdown__item strong{
    grid-area: add;                     /* Place in add grid area for header */
    width: 100%;
    align-self: center;                 /* Center vertically */
}

/* Legacy style for span elements in header */
.tagify__dropdown.users-list header.tagify__dropdown__item span{
    grid-area: remaning;                /* Place in remaining grid area for header */
    width: 100%;
    font-size: .9em;                    /* Slightly smaller than name */
    opacity: .6;                        /* More subdued appearance */
}

/* ========== MAIN HEADER STYLING ========== */
/* Style for the "Add All" header section */
.tagify__dropdown.users-list .tagify__dropdown__item__addAll{
    border-bottom: 1px solid #DDD;  /* Separator line */
    gap: 0;                         /* No gap in header */
}

/* ========== REMOVE ALL BUTTON ========== */
/* Style for the "Remove all" link in header */
.tagify__dropdown.users-list .remove-all-tags{
    grid-area: remove-tags;         /* Place in remove-tags grid area */
    justify-self: self-end;         /* Align to right */
    font-size: .8em;
    user-select: none;              /* Prevent text selection */
}

/* Hover effect for remove all button */
.tagify__dropdown.users-list .remove-all-tags:hover{
    color: white;
    background: salmon;             /* Red background on hover */
}

/* ========== SELECTED TAG STYLING ========== */
/* Prevent text wrapping in tags */
.tagify__tag{
    white-space: nowrap;
}

/* Image styling within tags */
.tagify__tag img{
    width: 100%;
    vertical-align: top;
    pointer-events: none;           /* Prevent image from interfering with clicks */
}

/* ========== TAG AVATAR HOVER EFFECTS ========== */
/* Scale and move avatar when hovering over tag */
.tagify__tag:hover .tagify__tag__avatar-wrap{
    transform: scale(1.6) translateX(-10%);
}

/* ========== TAG AVATAR STYLING ========== */
/* Small circular avatar in tags */
.tagify__tag .tagify__tag__avatar-wrap{
    width: 16px;
    height: 16px;
    white-space: normal;
    border-radius: 50%;
    background: silver;             /* Fallback background */
    margin-right: 5px;              /* Space between avatar and text */
    transition: .12s ease-out;      /* Smooth hover transition */
}

/* ========== GROUP STYLING ========== */
/* Hide empty groups */
.users-list .tagify__dropdown__itemsGroup:empty{
    display: none;
}

/* ========== CONTACT GROUP HEADER ========== */
/* Style for each contact group header */
.users-list .group-header {
    display: flex;                  /* Flexbox layout */
    justify-content: space-between; /* Space between title and button */
    align-items: center;            /* Center items vertically */
    font-size: .9em;
    padding: 8px 12px;
    margin: 0;
    border-radius: 4px;
    background: #f8f9fa;            /* Light gray background */
    color: #333;                    /* Dark text */
    font-weight: 600;               /* Semi-bold text */
    user-select: none;              /* Prevent text selection */
    border-bottom: 1px solid #DDD;  /* Separator line */
}

/* ========== GROUP TITLE STYLING ========== */
/* Style for the "Contact Group: X" text */
.users-list .group-title {
    font-style: italic;             /* Italicized text */
    color: #666;                    /* Medium gray color */
}

/* ========== ADD GROUP BUTTON ========== */
/* Style for the "+ Add All (X)" buttons */
.users-list .add-group-btn {
    border-radius: 4px;             /* Rounded corners */
    cursor: pointer;                /* Show it's clickable */
    font-size: 0.8em;               /* Smaller text */
    transition: background-color 0.2s ease; /* Smooth color transition */
}

/* ========== GROUP SEPARATORS ========== */
/* Remove default group separators */
.users-list .tagify__dropdown__itemsGroup::before{
    display: none;
}

/* Add border between groups (except first) */
.users-list .tagify__dropdown__itemsGroup:not(:first-of-type){
    border-top: 1px solid #DDD;
}

/* ========== MAIN TAGIFY COMPONENT STYLING ========== */
/* Comprehensive styling for the main Tagify container using CSS custom properties */
.tagify {
    /* Define color scheme and appearance variables */
    --tags-disabled-bg: #f1f1f1;           /* Background when disabled */
    --tags-border-color: #ddd;             /* Default border color */
    --tags-hover-border-color: #ccc;       /* Border color on hover */
    --tags-focus-border-color:red;         /* Border color when focused */
    --tag-bg: #eeeef5;                     /* Individual tag background */
    --tag-hover: #d3e2e2;                  /* Tag background on hover */
    --tag-text-color: black;               /* Tag text color */
    --tag-text-color--edit: black;         /* Tag text color when editing */
    --tag-pad: 0.3em 0.5em;                /* Tag internal padding */
    --tag-inset-shadow-size: 1.1em;        /* Shadow size for tags */
    --tag-invalid-color: #d39494;          /* Color for invalid tags */
    --tag-invalid-bg: rgba(211, 148, 148, 0.5); /* Background for invalid tags */
    --tag-remove-bg: rgba(211, 148, 148, 0.3);  /* Background for remove button */
    --tag-remove-btn-color: black;         /* Remove button text color */
    --tag-remove-btn-bg: none;             /* Remove button background */
    --tag-remove-btn-bg--hover: #c77777;   /* Remove button hover background */
    --input-color: inherit;                /* Input text color */
    --tag--min-width: 1ch;                 /* Minimum tag width */
    --tag--max-width: auto;                /* Maximum tag width */
    --tag-hide-transition: 0.3s;           /* Transition time for hiding tags */
    --placeholder-color: rgba(0, 0, 0, 0.4);       /* Placeholder text color */
    --placeholder-color-focus: rgba(0, 0, 0, 0.25); /* Placeholder color when focused */
    --loader-size: 0.8em;                  /* Loading indicator size */
    --readonly-striped: 1;                 /* Striped pattern for readonly */
    
    /* Layout and positioning */
    display: flex;                          /* Flexbox layout */
    align-items: flex-start;                /* Align items to top */
    flex-wrap: wrap;                        /* Allow wrapping to new lines */
    border: 1px solid #ddd;                 /* Default border */
    border: 1px solid var(--tags-border-color); /* Use custom property */
    padding: 0;                             /* No internal padding */
    line-height: 0;                         /* Reset line height */
    cursor: text;                           /* Text cursor to indicate input */
    outline: 0;                             /* Remove focus outline */
    position: relative;                     /* For absolute positioning of children */
    box-sizing: border-box;                 /* Include border in size calculations */
    transition: .1s;                        /* Smooth transitions */
}

/* ========== INPUT FIELD STYLING ========== */
/* Remove default padding from the input field */
.tagify__input{
    padding-left: 0px;
    padding-right: 0px;
}

/* ========== DROPDOWN ITEM STYLING ========== */
/* Style for individual dropdown items */
.tagify__dropdown__item{
  border-color: #1b2436;           /* Custom border color */
  border-bottom: 1px #ced4da solid; /* Bottom border separator */
  height: 120px;                   /* Increased height for more contact info */
  align-items: center;             /* Center content vertically */
  padding-left: 1rem;              /* Left padding */
  padding-right: 1rem;             /* Right padding */
}

/* Placeholder for hover effects (currently commented out) */
.tagify__dropdown__item:hover{
  /* background: red; */
  color: yellow;
  color: white !important;
}

/* ========== DROPDOWN WRAPPER STYLING ========== */
/* Style for the dropdown container wrapper */
.tagify__dropdown .tagify__dropdown__wrapper {
    padding: 0rem;                  /* No padding */
    border-color: #ced4da;          /* Custom border color */
}

/* ========== DROPDOWN CONTAINER STYLING ========== */
/* Main dropdown container spacing */
.tagify__dropdown{
  padding-left: 20px;               /* Left padding for content */
  padding-right: 20px;              /* Right padding for content */
}

/* ========== UTILITY CLASSES ========== */
.opacity-1{
  opacity: 1 !important;           /* Force full opacity */
}
</style>