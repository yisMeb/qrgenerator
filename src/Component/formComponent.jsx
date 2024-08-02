import React, { useState } from 'react';

const FormComponent = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form  onSubmit={handleSubmit}>
      <h3>Form</h3>
      <div>
        <input
          type="text"
          name="name"
          placeholder='Your name'
          pattern="^[A-Za-z\s]+$"
          title="Name should only contain letters and spaces."
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder='exaple@gmail.com'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          placeholder='+1123456789'
          value={formData.phone}
          onChange={handleChange}
          pattern="^\+\d{11,14}$"
          title="Phone number should start with a '+' and contain 11 to 14 digits."
          required
        />
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default FormComponent;
