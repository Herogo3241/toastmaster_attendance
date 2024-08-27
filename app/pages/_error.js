function Error({ statusCode }) {
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
      <p>{statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}</p>
      <button onClick={() => router.push('/')}>Go back to form</button>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error


