const form = document.getElementById('registrationForm');
const roleSelect = document.getElementById('role');
const dynamicFields = document.getElementById('dynamicFields');

// 1. Dynamic Field Manipulation
roleSelect.addEventListener('change', () => {
    if (roleSelect.value === 'Teacher') {
        dynamicFields.innerHTML = '<input type="text" id="skills" placeholder="Enter Skills (comma separated)">';
    } else {
        dynamicFields.innerHTML = '';
    }
});

// 2. Real-time Password Strength Check
document.getElementById('password').addEventListener('input', function(e) {
    const role = roleSelect.value;
    const pwd = e.target.value;
    
    // Logic: Admins need 12 chars, others need 6
    const minLength = (role === 'Admin') ? 12 : 6;
    
    if (pwd.length < minLength) {
        e.target.style.borderColor = 'red';
    } else {
        e.target.style.borderColor = 'green';
    }
});

// 3. Form Submission and Final Validation
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback');
    
    // Domain Check (Exercise Req #3)
    if (!email.endsWith('.com') && !email.endsWith('.edu')) {
        feedback.innerText = "Invalid email domain. Use .com or .edu";
        return;
    }

    alert("Registration Successful!");
});