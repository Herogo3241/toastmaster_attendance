"use client";
import { useState } from "react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const Form = () => {
  const initialFormData = {
    Name: "",
    Phone: "",
    email: "",
    isGuest: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    Name: "",
    Phone: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = { Name: "", Phone: "", email: "" };
    if (!formData.Name.trim()) newErrors.Name = "Name is required";
    if (!formData.Phone.trim()) newErrors.Phone = "Phone is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.values(formErrors).some((error) => error)) {
      setErrors(formErrors);
    } else {
      try {
        const currentDate = new Date().toDateString(); // Get current date in ISO format
        if (formData.isGuest) {
          await supabase.from('guests').insert([
            { name: formData.Name, phone: formData.Phone, email: formData.email, date: currentDate }
          ]);
        } else {
          await supabase.from('members').insert([
            { name: formData.Name, phone: formData.Phone, email: formData.email, date: currentDate }
          ]);
        }
        setFormData(initialFormData);
        window.location.href = `/success?message=${encodeURIComponent('Your submission was successful.')}`;
      } catch (error) {
        window.location.href = `/error?message=${encodeURIComponent('There was an error with your submission.')}`;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <header className="header">
        <img src="/toast.jpg" alt="Toastmasters Logo" className="logo" /> {/* Replace with actual logo path */}
        <h1>Toastmasters</h1>
      </header>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
        />
        {errors.Name && <span className="error">{errors.Name}</span>}
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="Phone"
          value={formData.Phone}
          onChange={handleChange}
        />
        {errors.Phone && <span className="error">{errors.Phone}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <input
          type="checkbox"
          id="isGuest"
          name="isGuest"
          checked={formData.isGuest}
          onChange={handleChange}
        />
        <label htmlFor="isGuest">Are you a guest?</label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
