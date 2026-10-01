<template>
  <div class="email-composer">
    <!-- AI Assistant Panel -->
    <div class="ai-panel">
      <h3>AI Writing Assistant</h3>
      
      <!-- Content Type Selection -->
      <div class="content-type">
        <label>Generate:</label>
        <select v-model="contentType">
          <option value="subject">Subject Lines</option>
          <option value="email">Email Content</option>
          <option value="sms">SMS Message</option>
          <option value="optimize">Optimize Existing</option>
        </select>
      </div>

      <!-- Campaign Details -->
      <div class="campaign-inputs">
        <input 
          v-model="campaignTopic" 
          placeholder="Campaign topic (e.g., Summer Sale, Newsletter)"
          class="input-field"
        />
        
        <input 
          v-model="targetAudience" 
          placeholder="Target audience (e.g., existing customers, millennials)"
          class="input-field"
        />
        
        <select v-model="tone">
          <option value="professional">Professional</option>
          <option value="casual">Casual & Friendly</option>
          <option value="urgent">Urgent</option>
          <option value="promotional">Promotional</option>
        </select>
      </div>

      <!-- Generate Button -->
      <button 
        @click="generateContent" 
        :disabled="loading || !campaignTopic"
        class="generate-btn"
      >
        {{ loading ? 'Generating...' : 'Generate with AI' }}
      </button>

      <!-- AI Suggestions -->
      <div v-if="suggestions.length > 0" class="suggestions">
        <h4>AI Suggestions:</h4>
        <div 
          v-for="(suggestion, index) in suggestions" 
          :key="index"
          class="suggestion-item"
          @click="useSuggestion(suggestion)"
        >
          {{ suggestion }}
        </div>
      </div>
    </div>

    <!-- Main Compose Area -->
    <div class="compose-area">
      <div class="subject-section">
        <label>Subject:</label>
        <input 
          v-model="emailSubject" 
          placeholder="Enter subject line"
          class="subject-input"
        />
        <button @click="generateSubjectLines" class="mini-ai-btn">✨ AI</button>
      </div>

      <div class="message-section">
        <textarea 
          v-model="emailContent"
          placeholder="Write your message (use @@ to mention tags)"
          class="message-textarea"
          rows="10"
        ></textarea>
        <button @click="improveContent" class="mini-ai-btn">✨ Improve</button>
      </div>

      <!-- Character Count for SMS -->
      <div v-if="showSMSCount" class="character-count">
        {{ smsCharCount }}/160 characters
      </div>
    </div>

    <!-- Error Display -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { GoogleGenerativeAI } from "@google/generative-ai"

export default {
  name: 'EmailComposer',
  data() {
    return {
      // AI Configuration
      genAI: null,
      model: null,
      loading: false,
      error: '',
      
      // Form Data
      contentType: 'subject',
      campaignTopic: '',
      targetAudience: '',
      tone: 'professional',
      emailSubject: '',
      emailContent: '',
      
      // AI Results
      suggestions: []
    }
  },
  
  computed: {
    showSMSCount() {
      return this.contentType === 'sms'
    },
    
    smsCharCount() {
      return this.emailContent.length
    }
  },
  
  mounted() {
    this.initializeGemini()
  },
  
  methods: {
    initializeGemini() {
      try {
        // Temporary hardcoded API key for testing
        const apiKey = "AIzaSyDJUn7UEia1bOxfFYac87FlZ3LtElfEJIw"
        
        console.log('Using hardcoded API key for testing')

        this.genAI = new GoogleGenerativeAI(apiKey)
        
        if (!this.genAI) {
          throw new Error("genAI is undefined after instantiation")
        }

        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
        console.log('Gemini AI initialized successfully')
        this.error = '' // Clear any previous errors
      } catch (error) {
        this.error = `Failed to initialize AI: ${error.message}`
        console.error('Gemini initialization error:', error)
      }
    },
    
    async generateContent() {
      if (!this.model) {
        this.error = 'AI not initialized'
        return
      }
      
      this.loading = true
      this.error = ''
      this.suggestions = []
      
      try {
        const prompt = this.buildPrompt()
        const result = await this.model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        
        this.processSuggestions(text)
        
      } catch (error) {
        this.error = this.handleError(error)
        console.error('Generation error:', error)
      } finally {
        this.loading = false
      }
    },
    
    buildPrompt() {
      const prompts = {
        subject: `Generate 5 compelling email subject lines for a ${this.campaignTopic} campaign targeting ${this.targetAudience}. Tone: ${this.tone}. Make them engaging and clickable. Return only the subject lines, one per line.`,
        
        email: `Write a ${this.tone} email for a ${this.campaignTopic} campaign targeting ${this.targetAudience}. Include:
        - Engaging opening
        - Clear value proposition  
        - Call to action
        - Professional closing
        Keep it concise but persuasive.`,
        
        sms: `Write a ${this.tone} SMS message (under 160 characters) for a ${this.campaignTopic} campaign targeting ${this.targetAudience}. Make it compelling with a clear call to action.`,
        
        optimize: `Improve this ${this.contentType === 'subject' ? 'subject line' : 'email content'} to be more engaging and ${this.tone}:
        
        "${this.contentType === 'subject' ? this.emailSubject : this.emailContent}"
        
        Campaign: ${this.campaignTopic}
        Audience: ${this.targetAudience}
        
        Provide 3 improved versions.`
      }
      
      return prompts[this.contentType] || prompts.email
    },
    
    processSuggestions(text) {
      // Split response into individual suggestions
      const suggestions = text.split('\n')
        .filter(line => line.trim())
        .map(line => line.replace(/^\d+\.?\s*/, '').trim())
        .filter(line => line.length > 0)
      
      this.suggestions = suggestions
    },
    
    useSuggestion(suggestion) {
      if (this.contentType === 'subject') {
        this.emailSubject = suggestion
      } else {
        this.emailContent = suggestion
      }
      
      // Clear suggestions after use
      this.suggestions = []
    },
    
    async generateSubjectLines() {
      const originalType = this.contentType
      this.contentType = 'subject'
      await this.generateContent()
      this.contentType = originalType
    },
    
    async improveContent() {
      if (!this.emailContent.trim()) {
        this.error = 'Please enter some content to improve'
        return
      }
      
      const originalType = this.contentType
      this.contentType = 'optimize'
      await this.generateContent()
      this.contentType = originalType
    },
    
    handleError(error) {
      if (error.message?.includes('API key')) {
        return 'Invalid API key. Please check your Gemini API key.'
      } else if (error.message?.includes('quota')) {
        return 'Daily quota exceeded. Try again tomorrow or use a different API key.'
      } else if (error.message?.includes('rate limit')) {
        return 'Rate limit exceeded. Please wait a moment and try again.'
      } else {
        return 'AI generation failed. Please try again.'
      }
    }
  }
}
</script>

<style scoped>
.email-composer {
  display: flex;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.ai-panel {
  flex: 1;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.compose-area {
  flex: 2;
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.content-type {
  margin-bottom: 15px;
}

.campaign-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.input-field, select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.generate-btn {
  background: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  width: 100%;
  transition: background-color 0.3s;
}

.generate-btn:hover:not(:disabled) {
  background: #0056b3;
}

.generate-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.suggestions {
  margin-top: 20px;
}

.suggestion-item {
  background: white;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #e9ecef;
  transition: all 0.2s;
}

.suggestion-item:hover {
  background: #e3f2fd;
  border-color: #2196f3;
}

.subject-section, .message-section {
  margin-bottom: 20px;
  position: relative;
}

.subject-input {
  width: calc(100% - 60px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.message-textarea {
  width: calc(100% - 60px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
}

.mini-ai-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
}

.mini-ai-btn:hover {
  background: #218838;
}

.character-count {
  color: #6c757d;
  font-size: 12px;
  text-align: right;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

h3, h4 {
  margin-top: 0;
  color: #333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .email-composer {
    flex-direction: column;
    padding: 10px;
  }
  
  .ai-panel, .compose-area {
    flex: none;
  }
}

/* Accessibility: Support for Forced Colors Mode */
@media (forced-colors: active) {
  .ai-panel, .compose-area {
    border: 1px solid CanvasText;
    background: Canvas;
    color: CanvasText;
  }
  
  .generate-btn {
    background: ButtonFace !important;
    color: ButtonText !important;
    border: 1px solid ButtonText !important;
  }
  
  .generate-btn:disabled {
    background: GrayText !important;
    color: Canvas !important;
  }
  
  .suggestion-item {
    border: 1px solid CanvasText !important;
    background: Canvas !important;
    color: CanvasText !important;
  }
  
  .suggestion-item:hover {
    background: Highlight !important;
    color: HighlightText !important;
  }
  
  .input-field, select, .subject-input, .message-textarea {
    background: Field !important;
    color: FieldText !important;
    border: 1px solid FieldText !important;
  }
  
  .mini-ai-btn {
    background: ButtonFace !important;
    color: ButtonText !important;
    border: 1px solid ButtonText !important;
  }
  
  .error-message {
    background: Canvas !important;
    color: CanvasText !important;
    border: 1px solid CanvasText !important;
  }
}
</style>