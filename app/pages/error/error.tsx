"use client"
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Updated import

const ErrorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <div style={{
        textAlign: 'center',
        padding: '2rem',
        color: '#fff',
        background: 'linear-gradient(to right, #d32f2f, #f44336)', // Toastmasters red gradient
        borderRadius: '30px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Shadow effect
        maxWidth: '600px',
        margin: 'auto',
    }}>
      <h1>Error!</h1>
      <p>{message || "There was an error with your submission."}</p>
      <button onClick={() => router.push('/')}>Go back to form</button>
    </div>
  );
};

export default ErrorPage;
