// 1. Survey Data Structure
const surveyQuestions = [
    {
        id: "q1",
        type: "text",
        label: "What is your full name?",
        required: true,
        limit: 50
    },
    {
        id: "q2",
        type: "radio",
        label: "How would you rate our service?",
        options: ["Excellent", "Good", "Poor"],
        required: true
    },
    {
        id: "q3",
        type: "checkbox",
        label: "Which features did you use?",
        options: ["Live Chat", "Knowledge Base", "Video Tutorials"],
        minSelection: 1
    }
];

// 2. Generator Function
function buildSurvey() {
    const container = document.getElementById('survey-fields');
    
    surveyQuestions.forEach(q => {
        const fieldWrapper = document.createElement('div');
        fieldWrapper.className = 'field-group';
        fieldWrapper.innerHTML = `<label><strong>${q.label}</strong></label>`;

        if (q.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = q.id;
            input.maxLength = q.limit;
            fieldWrapper.appendChild(input);
        } 
        else if (q.type === 'radio' || q.type === 'checkbox') {
            q.options.forEach(opt => {
                const label = document.createElement('label');
                label.innerHTML = `
                    <input type="${q.type}" name="${q.id}" value="${opt}"> ${opt}
                `;
                fieldWrapper.appendChild(label);
            });
        }

        // Placeholder for inline error message
        const errorSpan = document.createElement('span');
        errorSpan.id = `error-${q.id}`;
        errorSpan.className = 'error-text';
        fieldWrapper.appendChild(errorSpan);

        container.appendChild(fieldWrapper);
    });
}

// 3. Dynamic Validation Logic
function validateSurvey() {
    let isValid = true;
    
    surveyQuestions.forEach(q => {
        const errorSpan = document.getElementById(`error-${q.id}`);
        errorSpan.innerText = ""; // Clear previous errors

        if (q.type === 'text') {
            const val = document.getElementById(q.id).value;
            if (q.required && val.trim() === "") {
                errorSpan.innerText = "This field is required.";
                isValid = false;
            }
        } 
        
        if (q.type === 'radio') {
            const checked = document.querySelector(`input[name="${q.id}"]:checked`);
            if (q.required && !checked) {
                errorSpan.innerText = "Please select an option.";
                isValid = false;
            }
        }

        if (q.type === 'checkbox') {
            const checkedCount = document.querySelectorAll(`input[name="${q.id}"]:checked`).length;
            if (q.minSelection && checkedCount < q.minSelection) {
                errorSpan.innerText = `Select at least ${q.minSelection} option(s).`;
                isValid = false;
            }
        }
    });

    return isValid;
}

// 4. Form Event Listener
document.getElementById('survey-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateSurvey()) {
        alert("Survey submitted successfully!");
    }
});

// Initialize
buildSurvey();