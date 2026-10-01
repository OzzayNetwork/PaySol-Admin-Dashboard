<template>
    <div>

    </div>
</template>

<script setup>
    // Reactive data to store selected contacts
const selectedContacts = ref([])
const selectedContactsCount = ref(0)
const availableTags = ref([])
const messageTemplate = ref('')

/**
 * Handle contacts selected from the Tagify component
 * @param {Array} contacts - Array of selected contact objects
 */
function handleSelectedContacts(contacts) {
  console.log('Received contacts from Tagify:', contacts)
  
  // Store the contacts data
  selectedContacts.value = contacts
  selectedContactsCount.value = contacts.length
  
  // Extract available tags from selected contacts
  extractAvailableTags(contacts)
  
  // Example: Filter by contact group
  const parents = contacts.filter(contact => contact.contactGroup === 'Parents')
  const teachers = contacts.filter(contact => contact.contactGroup === 'Teachers')
  
  console.log('Parents selected:', parents)
  console.log('Teachers selected:', teachers)
  console.log('selected contacts count', selectedContactsCount.value)
  console.log('Available tags:', availableTags.value)
}

/**
 * Extract available tags from selected contacts
 * @param {Array} contacts - Array of selected contact objects
 */
function extractAvailableTags(contacts) {
  if (contacts.length === 0) {
    availableTags.value = []
    return
  }
  
  // Define available tag types with descriptions
  const tagDefinitions = [
    {
      key: 'name',
      label: 'Contact Name',
      description: 'Full name of the contact',
      example: 'Sarah Johnson'
    },
    {
      key: 'email',
      label: 'Email Address',
      description: 'Email address of the contact',
      example: 'sarah.johnson@gmail.com'
    },
    {
      key: 'phone',
      label: 'Phone Number',
      description: 'Phone number of the contact',
      example: '+1-555-0101'
    },
    {
      key: 'contactGroup',
      label: 'Contact Group',
      description: 'Group/category of the contact',
      example: 'Parents'
    },
    {
      key: 'firstName',
      label: 'First Name',
      description: 'First name only',
      example: 'Sarah'
    },
    {
      key: 'lastName',
      label: 'Last Name', 
      description: 'Last name only',
      example: 'Johnson'
    }
  ]
  
  // Check which fields are available in ALL selected contacts
  const availableFields = tagDefinitions.filter(tag => {
    return contacts.every(contact => {
      if (tag.key === 'firstName') {
        return contact.name && contact.name.split(' ')[0]
      }
      if (tag.key === 'lastName') {
        return contact.name && contact.name.split(' ').slice(1).join(' ')
      }
      return contact[tag.key] && contact[tag.key].trim() !== ''
    })
  })
  
  availableTags.value = availableFields
}

/**
 * Process message template with contact-specific data
 * @param {string} template - Message template with placeholders
 * @param {Object} contact - Individual contact object
 * @returns {string} Processed message with replaced tags
 */
function processMessageForContact(template, contact) {
  let processedMessage = template
  
  // Replace common tags
  processedMessage = processedMessage.replace(/{name}/g, contact.name || '')
  processedMessage = processedMessage.replace(/{email}/g, contact.email || '')
  processedMessage = processedMessage.replace(/{phone}/g, contact.phone || '')
  processedMessage = processedMessage.replace(/{contactGroup}/g, contact.contactGroup || '')
  
  // Replace derived tags
  const firstName = contact.name ? contact.name.split(' ')[0] : ''
  const lastName = contact.name ? contact.name.split(' ').slice(1).join(' ') : ''
  
  processedMessage = processedMessage.replace(/{firstName}/g, firstName)
  processedMessage = processedMessage.replace(/{lastName}/g, lastName)
  
  return processedMessage
}

/**
 * Generate personalized messages for all selected contacts
 * @param {string} template - Message template with placeholders
 * @returns {Array} Array of objects with contact info and personalized message
 */
function generatePersonalizedMessages(template) {
  return selectedContacts.value.map(contact => ({
    contact: contact,
    message: processMessageForContact(template, contact),
    recipient: {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      group: contact.contactGroup
    }
  }))
}

/**
 * Insert tag at cursor position in textarea
 * @param {string} tag - Tag to insert (e.g., '{name}')
 * @param {HTMLElement} textareaRef - Reference to textarea element
 */
function insertTag(tag, textareaRef) {
  const textarea = textareaRef.value
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = textarea.value
  
  const before = text.substring(0, start)
  const after = text.substring(end, text.length)
  
  textarea.value = before + `{${tag}}` + after
  textarea.focus()
  textarea.setSelectionRange(start + tag.length + 2, start + tag.length + 2)
  
  // Update the reactive template
  messageTemplate.value = textarea.value
}

/**
 * Preview personalized messages
 */
function previewMessages() {
  if (!messageTemplate.value.trim()) {
    alert('Please enter a message template first')
    return
  }
  
  if (selectedContacts.value.length === 0) {
    alert('Please select contacts first')
    return
  }
  
  const personalizedMessages = generatePersonalizedMessages(messageTemplate.value)
  console.log('Personalized Messages:', personalizedMessages)
  
  // You can display these in a modal or separate component
  return personalizedMessages
}
</script>

<style lang="scss" scoped>

</style>