let currentStep = 1;
const totalSteps = 4;
let formData = {}; // Temporary storage for user input

function updateUI() {
    // 1. Show/Hide Stages
    document.querySelectorAll('.form-stage').forEach((stage, index) => {
        stage.style.display = (index + 1 === currentStep) ? 'block' : 'none';
    });

    // 2. Update Progress Bar
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progress-bar').style.width = progress + "%";

    // 3. Update Buttons
    document.getElementById('prevBtn').disabled = (currentStep === 1);
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.innerText = (currentStep === totalSteps) ? "Submit" : "Next";

    // 4. If at Review Stage, populate data
    if (currentStep === 4) populateReview();
}

function validateStage(step) {
    const activeStage = document.getElementById(`stage-${step}`);
    const inputs = activeStage.querySelectorAll('input, select');
    let isStepValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('invalid');
            isStepValid = false;
        } else {
            input.classList.remove('invalid');
            // Save data to our temporary object
            formData[input.id] = input.value;
        }
    });

    return isStepValid;
}

function changeStage(delta) {
    // If moving forward, validate current step
    if (delta === 1 && !validateStage(currentStep)) {
        alert("Please fill in all required fields.");
        return;
    }

    currentStep += delta;

    if (currentStep > totalSteps) {
        alert("Form Submitted! Data: " + JSON.stringify(formData));
        location.reload(); // Reset after submission
    } else {
        updateUI();
    }
}

function populateReview() {
    const reviewDiv = document.getElementById('review-data');
    reviewDiv.innerHTML = `
        <p><strong>Username:</strong> ${formData.username}</p>
        <p><strong>Email:</strong> ${formData['stage-email']}</p>
        <p><strong>Age:</strong> ${formData.age}</p>
    `;
}

// Initial Call
updateUI();