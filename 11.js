import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email format is invalid";
    }
    if (formData.password.length < 6) tempErrors.password = "Password must be 6+ chars";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form Submitted Successfully!");
      setFormData({ name: '', email: '', password: '' }); // Reset
      setErrors({});
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px' }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        <div>
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;