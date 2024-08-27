"use client"

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SuccessPage = () => {
    const searchParams = useSearchParams();
    const message = searchParams.get('message');

  return (
    <div style={{
        textAlign: 'center',
        padding: '2rem',
        background: 'linear-gradient(to right, #003f6c, #007acc)', // Toastmasters blue gradient
        borderRadius: '30px', // Rounded corners
        color: '#fff',
        maxWidth: '600px',
        margin: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
    }}>
      <h1>Success!</h1>
      <p>{message || "Your submission was successful."}</p>
    </div>
  );
};

export default SuccessPage;
