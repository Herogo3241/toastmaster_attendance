"use client";
import { useState } from "react";
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const GuestForm = () => {
  const initialFormData = {
    Name: "",
    Phone: "",
    email: "",
    isGuest: true,
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
        const currentDate = new Date().toDateString(); // Get current date in ISO format'
        await supabase.from('guests').insert([
          { name: formData.Name, phone: formData.Phone, email: formData.email, date: currentDate }
        ]);
        
        setFormData(initialFormData);
        window.location.href = `/pages/success?message=${encodeURIComponent('Your submission was successful.')}`;
      } catch (error) {
        window.location.href = `/pages/error?message=${encodeURIComponent('There was an error with your submission.')}`;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <header className="header">
        <img src="/toast.png" alt="Toastmasters Logo" className="logo" /> {/* Replace with actual logo path */}
        <h1>Trivandrum Toastmasters</h1>
      </header>
      <div>
        <input
          type="text"
          id="name"
          name="Name"
          placeholder="Name"
          value={formData.Name}
          onChange={handleChange}
        />
        {errors.Name && <span className="error">{errors.Name}</span>}
      </div>
      <div>
        <input
          type="text"
          id="phone"
          name="Phone"
          placeholder="Phone"
          value={formData.Phone}
          onChange={handleChange}
        />
        {errors.Phone && <span className="error">{errors.Phone}</span>}
      </div>
      <div>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default GuestForm;
