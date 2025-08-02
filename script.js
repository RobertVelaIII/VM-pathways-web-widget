// VM Pathways Widget JavaScript

// Data model for storing intake responses
const intakeData = {
    // Step 1
    seekingReliefFor: '',
    previousCannabisUse: '',
    takingMedications: false,
    medicationsList: '',
    
    // Step 2
    selectedSymptoms: [],
    otherSymptom: '',
    symptomSeverity: '',
    
    // Step 3
    consumptionMethods: [],
    usageFrequency: '',
    
    // Step 4
    productTypes: [],
    potencyPreference: '',
    
    // Step 5
    desiredEffects: [],
    effectsToAvoid: [],
    
    // Step 6
    budget: '',
    additionalInfo: ''
};

// Widget state
let currentStep = 1;
const totalSteps = 6;

// DOM Elements
const progressFill = document.getElementById('progress-fill');
const stepCounter = document.getElementById('step-counter');
const stepTitle = document.getElementById('step-title');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');
const recommendationModal = document.getElementById('recommendation-modal');
const loadingSpinner = document.getElementById('loading-spinner');
const recommendationResult = document.getElementById('recommendation-result');
const productName = document.getElementById('product-name');
const productDescription = document.getElementById('product-description');
const productLink = document.getElementById('product-link');
const closeModal = document.querySelector('.close-modal');
const doneBtn = document.getElementById('done-btn');

// Step titles
const stepTitles = {
    1: 'General Health Context',
    2: 'Specific Symptoms',
    3: 'Usage Preferences',
    4: 'Product Types',
    5: 'Desired Effects',
    6: 'Additional Information'
};

// Initialize the widget
function initWidget() {
    updateProgressBar();
    setupEventListeners();
}

// Update the progress bar based on current step
function updateProgressBar() {
    const progress = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${progress}%`;
    stepCounter.textContent = `Step ${currentStep} of ${totalSteps}`;
    stepTitle.textContent = stepTitles[currentStep];
    
    // Update button states
    backBtn.disabled = currentStep === 1;
    nextBtn.textContent = currentStep === totalSteps ? 'Get Recommendation' : 'Next';
    
    // Show active step
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.toggle('active', index + 1 === currentStep);
    });
}

// Set up all event listeners
function setupEventListeners() {
    // Navigation buttons
    backBtn.addEventListener('click', goToPreviousStep);
    nextBtn.addEventListener('click', goToNextStep);
    
    // Modal close buttons
    closeModal.addEventListener('click', closeRecommendationModal);
    doneBtn.addEventListener('click', resetWidget);
    
    // Step 1 - Toggle medications textarea
    const takingMedicationsCheckbox = document.getElementById('taking-medications');
    const medicationsDetails = document.getElementById('medications-details');
    
    takingMedicationsCheckbox.addEventListener('change', function() {
        medicationsDetails.classList.toggle('hidden', !this.checked);
        intakeData.takingMedications = this.checked;
    });
    
    // Step 2 - Other symptom text field toggle
    const otherSymptomCheckbox = document.querySelector('input[name="symptoms"][value="Other"]');
    const otherSymptomContainer = document.getElementById('other-symptom-container');
    
    otherSymptomCheckbox.addEventListener('change', function() {
        otherSymptomContainer.classList.toggle('hidden', !this.checked);
    });
    
    // Step 2 - Severity buttons
    const severityButtons = document.querySelectorAll('.severity-btn');
    severityButtons.forEach(button => {
        button.addEventListener('click', function() {
            severityButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            intakeData.symptomSeverity = this.dataset.value;
        });
    });
    
    // Set up input data collection
    setupDataCollection();
}

// Set up data collection from all inputs
function setupDataCollection() {
    // Step 1
    document.getElementById('seeking-relief-for').addEventListener('input', function() {
        intakeData.seekingReliefFor = this.value;
    });
    
    document.querySelectorAll('input[name="cannabis-use"]').forEach(radio => {
        radio.addEventListener('change', function() {
            intakeData.previousCannabisUse = this.value;
        });
    });
    
    document.getElementById('medications-list').addEventListener('input', function() {
        intakeData.medicationsList = this.value;
    });
    
    // Step 2
    document.querySelectorAll('input[name="symptoms"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                intakeData.selectedSymptoms.push(this.value);
            } else {
                intakeData.selectedSymptoms = intakeData.selectedSymptoms.filter(symptom => symptom !== this.value);
            }
        });
    });
    
    document.getElementById('other-symptom').addEventListener('input', function() {
        intakeData.otherSymptom = this.value;
    });
    
    // Step 3
    document.querySelectorAll('input[name="consumption-method"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                intakeData.consumptionMethods.push(this.value);
            } else {
                intakeData.consumptionMethods = intakeData.consumptionMethods.filter(method => method !== this.value);
            }
        });
    });
    
    document.querySelectorAll('input[name="usage-frequency"]').forEach(radio => {
        radio.addEventListener('change', function() {
            intakeData.usageFrequency = this.value;
        });
    });
    
    // Step 4
    document.querySelectorAll('input[name="product-type"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                intakeData.productTypes.push(this.value);
            } else {
                intakeData.productTypes = intakeData.productTypes.filter(type => type !== this.value);
            }
        });
    });
    
    document.querySelectorAll('input[name="potency"]').forEach(radio => {
        radio.addEventListener('change', function() {
            intakeData.potencyPreference = this.value;
        });
    });
    
    // Step 5
    document.querySelectorAll('input[name="desired-effects"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                intakeData.desiredEffects.push(this.value);
            } else {
                intakeData.desiredEffects = intakeData.desiredEffects.filter(effect => effect !== this.value);
            }
        });
    });
    
    document.querySelectorAll('input[name="avoid-effects"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                intakeData.effectsToAvoid.push(this.value);
            } else {
                intakeData.effectsToAvoid = intakeData.effectsToAvoid.filter(effect => effect !== this.value);
            }
        });
    });
    
    // Step 6
    document.querySelectorAll('input[name="budget"]').forEach(radio => {
        radio.addEventListener('change', function() {
            intakeData.budget = this.value;
        });
    });
    
    document.getElementById('additional-info').addEventListener('input', function() {
        intakeData.additionalInfo = this.value;
    });
}

// Form validation functions
function validateCurrentStep() {
    switch(currentStep) {
        case 1:
            // Require at least seeking relief for or previous cannabis use selection
            return intakeData.seekingReliefFor.trim() !== '' || intakeData.previousCannabisUse !== '';
        case 2:
            // Require at least one symptom and severity
            return intakeData.selectedSymptoms.length > 0 && intakeData.symptomSeverity !== '';
        case 3:
            // Require at least consumption method or usage frequency
            return intakeData.consumptionMethods.length > 0 || intakeData.usageFrequency !== '';
        case 4:
            // Require at least product type or potency preference
            return intakeData.productTypes.length > 0 || intakeData.potencyPreference !== '';
        case 5:
            // Require at least one desired effect
            return intakeData.desiredEffects.length > 0;
        case 6:
            // No strict requirements for last step
            return true;
        default:
            return true;
    }
}

function showValidationError() {
    // Highlight fields that need attention
    const errorMessages = {
        1: "Please tell us what you're seeking relief for or your previous cannabis use experience.",
        2: "Please select at least one symptom and indicate severity.",
        3: "Please select at least one consumption method or usage frequency.",
        4: "Please select at least one product type or potency preference.",
        5: "Please select at least one desired effect."
    };
    
    // Create or update error message
    let errorElement = document.getElementById('validation-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'validation-error';
        errorElement.style.color = '#e53935';
        errorElement.style.padding = '10px';
        errorElement.style.marginTop = '10px';
        errorElement.style.borderRadius = '5px';
        errorElement.style.backgroundColor = 'rgba(229, 57, 53, 0.1)';
        errorElement.style.textAlign = 'center';
        
        // Insert before navigation buttons
        const navigationButtons = document.querySelector('.navigation-buttons');
        navigationButtons.parentNode.insertBefore(errorElement, navigationButtons);
    }
    
    errorElement.textContent = errorMessages[currentStep] || 'Please complete all required fields.';
    errorElement.style.display = 'block';
    
    // Shake the error message
    errorElement.animate(
        [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ],
        {
            duration: 200,
            iterations: 2
        }
    );
    
    // Hide after 3 seconds
    setTimeout(() => {
        errorElement.style.display = 'none';
    }, 3000);
}

// Navigation functions
function goToPreviousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateProgressBar();
        
        // Hide any validation errors when going back
        const errorElement = document.getElementById('validation-error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
}

function goToNextStep() {
    // Validate current step before proceeding
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            updateProgressBar();
            
            // Hide any validation errors when moving forward
            const errorElement = document.getElementById('validation-error');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        } else {
            showRecommendationModal();
        }
    } else {
        showValidationError();
    }
}

// Recommendation modal functions
function showRecommendationModal() {
    recommendationModal.style.display = 'flex';
    loadingSpinner.classList.remove('hidden');
    recommendationResult.classList.add('hidden');
    
    // Get recommendation from OpenAI
    generateRecommendation()
        .then(recommendation => {
            loadingSpinner.classList.add('hidden');
            recommendationResult.classList.remove('hidden');
            
            // Update recommendation content
            productName.textContent = recommendation.name;
            productDescription.textContent = recommendation.description;
            productLink.href = recommendation.url || '#';
        })
        .catch(error => {
            console.error('Error getting recommendation:', error);
            
            loadingSpinner.classList.add('hidden');
            recommendationResult.classList.remove('hidden');
            
            // Show fallback recommendation
            productName.textContent = 'CBD Isolate Tincture';
            productDescription.textContent = 'For relief from inflammation with a medium potency and avoiding increased anxiety, consider the "CBD Isolate Tinctures" from Valley Medicinals. This product is sublingual for fast delivery and is tailored to provide pain/inflammation relief without the psychoactive effects that might increase anxiety.';
            productLink.href = 'https://valleymedicinals.com/products/cbd-isolate-tinctures';
        });
}

function closeRecommendationModal() {
    recommendationModal.style.display = 'none';
}

function resetWidget() {
    closeRecommendationModal();
    currentStep = 1;
    updateProgressBar();
}

// OpenAI API configuration
// API keys are loaded from config.js
const OPENAI_API_KEY = CONFIG.OPENAI_API_KEY;
const OPENAI_ASSISTANT_ID = CONFIG.OPENAI_ASSISTANT_ID;

// Generate recommendation based on intake data using OpenAI Assistant API
async function generateRecommendation() {
    try {
        // Create a thread
        const threadResponse = await fetch('https://api.openai.com/v1/threads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'OpenAI-Beta': 'assistants=v2'
            },
            body: JSON.stringify({})
        });
        
        if (!threadResponse.ok) {
            throw new Error(`Thread creation failed: ${threadResponse.status}`);
        }
        
        const threadData = await threadResponse.json();
        const threadId = threadData.id;
        console.log('Thread created:', threadId);
        
        // Format the user's intake data as a message
        const userMessage = formatIntakeDataMessage();
        
        // Add a message to the thread
        const messageResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'OpenAI-Beta': 'assistants=v2'
            },
            body: JSON.stringify({
                role: 'user',
                content: userMessage
            })
        });
        
        if (!messageResponse.ok) {
            throw new Error(`Message creation failed: ${messageResponse.status}`);
        }
        
        console.log('Message added to thread');
        
        // Run the assistant on the thread
        const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'OpenAI-Beta': 'assistants=v2'
            },
            body: JSON.stringify({
                assistant_id: OPENAI_ASSISTANT_ID
            })
        });
        
        if (!runResponse.ok) {
            throw new Error(`Run creation failed: ${runResponse.status}`);
        }
        
        const runData = await runResponse.json();
        const runId = runData.id;
        console.log('Run created:', runId);
        
        // Poll for the run completion
        let runStatus = 'queued';
        while (runStatus !== 'completed' && runStatus !== 'failed') {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
            
            const runStatusResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'OpenAI-Beta': 'assistants=v2'
                }
            });
            
            if (!runStatusResponse.ok) {
                throw new Error(`Run status check failed: ${runStatusResponse.status}`);
            }
            
            const runStatusData = await runStatusResponse.json();
            runStatus = runStatusData.status;
            console.log('Run status:', runStatus);
        }
        
        if (runStatus === 'failed') {
            throw new Error('Run failed');
        }
        
        // Get the messages (including the assistant's response)
        const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'OpenAI-Beta': 'assistants=v2'
            }
        });
        
        if (!messagesResponse.ok) {
            throw new Error(`Messages retrieval failed: ${messagesResponse.status}`);
        }
        
        const messagesData = await messagesResponse.json();
        const assistantMessages = messagesData.data.filter(msg => msg.role === 'assistant');
        
        if (assistantMessages.length === 0) {
            throw new Error('No assistant messages found');
        }
        
        // Parse the recommendation from the assistant's message
        const recommendationText = assistantMessages[0].content[0].text.value;
        console.log('Recommendation:', recommendationText);
        
        // Parse product name, description, and URL from the recommendation
        const recommendedProduct = parseRecommendation(recommendationText);
        
        return recommendedProduct;
    } catch (error) {
        console.error('Error generating recommendation:', error);
        
        // Fallback to a default recommendation
        return {
            name: 'Valley Medicinals Full Spectrum CBD Oil',
            description: 'We encountered an issue generating your personalized recommendation. Please try again or contact us for personalized assistance.',
            url: 'https://example.com/product/full-spectrum-cbd-oil'
        };
    }
}

// Format the intake data into a message for the AI
function formatIntakeDataMessage() {
    return `Please recommend a product based on the following customer preferences:

General Health:
- Seeking relief for: ${intakeData.seekingReliefFor || 'Not specified'}
- Previous cannabis use: ${intakeData.previousCannabisUse || 'Not specified'}
- Taking medications: ${intakeData.takingMedications ? 'Yes' : 'No'}
${intakeData.takingMedications ? `- Medications: ${intakeData.medicationsList || 'Not specified'}` : ''}

Symptoms:
- Selected symptoms: ${intakeData.selectedSymptoms.length > 0 ? intakeData.selectedSymptoms.join(', ') : 'None selected'}
${intakeData.selectedSymptoms.includes('Other') ? `- Other symptom: ${intakeData.otherSymptom || 'Not specified'}` : ''}
- Symptom severity: ${intakeData.symptomSeverity || 'Not specified'}

Usage Preferences:
- Consumption methods: ${intakeData.consumptionMethods.length > 0 ? intakeData.consumptionMethods.join(', ') : 'None selected'}
- Usage frequency: ${intakeData.usageFrequency || 'Not specified'}

Product Preferences:
- Product types: ${intakeData.productTypes.length > 0 ? intakeData.productTypes.join(', ') : 'None selected'}
- Potency preference: ${intakeData.potencyPreference || 'Not specified'}

Effects:
- Desired effects: ${intakeData.desiredEffects.length > 0 ? intakeData.desiredEffects.join(', ') : 'None selected'}
- Effects to avoid: ${intakeData.effectsToAvoid.length > 0 ? intakeData.effectsToAvoid.join(', ') : 'None selected'}

Other:
- Budget: ${intakeData.budget || 'Not specified'}
- Additional info: ${intakeData.additionalInfo || 'None provided'}

Please provide a specific product recommendation with name, description, and URL.`;
}

// Parse the recommendation text to extract product name, description, and URL
function parseRecommendation(text) {
    // Default values
    let product = {
        name: 'Recommended Product',
        description: text,
        url: null
    };
    
    // Clean up the text
    let cleanedText = text
        // Remove citation markers like [4:7†valleymedicinals_product_condition_map.json]
        .replace(/\[\d+:\d+†[^\]]+\]/g, '')
        // Remove phrases like "You can check them out here: (【4:9†source】."
        .replace(/You can check them out here:?.*?\(【\d+:\d+†[^)]*\)\./g, '')
        // Remove phrases like "More info: (【4:11†valleymedicinalsproductconditionmap.json】."
        .replace(/More info:?.*?\(【\d+:\d+†[^)]*\)\./g, '')
        // Remove any markdown formatting
        .replace(/[\*#_`]/g, '')
        // Clean up extra spaces and newlines
        .replace(/\s+/g, ' ')
        .trim();
    
    // Extract product name - typically starts with "I recommend" or similar phrases
    const nameRegex = /(?:I recommend|try|consider)[\s\w"']*?["']([^"']+)["']/i;
    const nameMatch = cleanedText.match(nameRegex);
    if (nameMatch && nameMatch[1]) {
        product.name = nameMatch[1].trim();
    } else {
        // Fallback: try to get the first quoted text as product name
        const fallbackNameMatch = cleanedText.match(/["']([^"']+)["']/);
        if (fallbackNameMatch && fallbackNameMatch[1]) {
            product.name = fallbackNameMatch[1].trim();
        }
    }
    
    // Extract URL - look for properly formatted URLs
    const urlRegex = /(https?:\/\/[^\s\)]+)(?:\)|\s|$)/;
    const urlMatch = cleanedText.match(urlRegex);
    if (urlMatch && urlMatch[1]) {
        product.url = urlMatch[1].trim();
        // Remove URL text from description
        cleanedText = cleanedText.replace(urlMatch[0], '');
    }
    
    // Remove any "URL:" or similar text
    cleanedText = cleanedText.replace(/URL:\s*\[[^\]]+\]/g, '');
    
    // Remove any remaining brackets and their contents
    cleanedText = cleanedText.replace(/\([^)]*\)/g, '');
    cleanedText = cleanedText.replace(/\[[^\]]*\]/g, '');
    
    // Clean up any text that looks like a raw URL display
    cleanedText = cleanedText.replace(/\(https?:\/\/[^\)]+\)/g, '');
    
    // Create a clean description - remove the product name if it appears at the beginning
    let description = cleanedText;
    if (product.name) {
        description = description.replace(new RegExp(`^.*?${product.name}.*?\\s`), '');
    }
    
    // Remove any "I recommend" phrases from the beginning
    description = description.replace(/^I recommend\s+/i, '');
    
    // Final cleanup of the description
    description = description
        // Remove any remaining citation markers that might have been missed
        .replace(/\(?【\d+:\d+†[^\)\]]*\)?\]?/g, '')
        // Remove any text like "check them out here"
        .replace(/check them out here\.?/gi, '')
        // Clean up spaces and punctuation
        .replace(/\s+/g, ' ')
        .replace(/\s\./g, '.')
        .trim();
    
    product.description = description;
    
    return product;
}

// Initialize the widget when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initWidget);
