import React, { useState } from 'react';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [heslo, setHeslo] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!email || !heslo) {
      setLoginError('Zadejte email a heslo!');
      return;
    }

    const mockToken = 'mock_jwt_token';
    onLoginSuccess({ email, token: mockToken });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', maxWidth: '300px' }}>
      <h2>Přihlášení</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Heslo:</label><br />
          <input 
            type="password" 
            value={heslo} 
            onChange={(e) => setHeslo(e.target.value)} 
            required
          />
        </div>
        <br />
        <button type="submit">Přihlásit</button>
      </form>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </div>
  );
}

export default LoginForm;
