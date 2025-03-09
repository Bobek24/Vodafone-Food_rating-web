import React, { useState } from 'react';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // 1 = zadání emailu, 2 = zadání kódu
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // 1) Odeslání e-mailu -> server vygeneruje kód a pošle
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Zadejte e-mail!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/request-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Na váš e-mail byl odeslán ověřovací kód.');
        setStep(2); // Přepneme se na krok 2 (zadání kódu)
      } else {
        setError(data.message || 'Něco se pokazilo.');
      }
    } catch (error) {
      setError('Chyba při komunikaci se serverem.');
    }
  };

  // 2) Ověření kódu -> server ověří kód a vrátí JWT
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!code) {
      setError('Zadejte kód z e-mailu!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Kód je platný, jste přihlášen.');
        // Můžeme volat onLoginSuccess a uložit token
        const userData = { email: data.email, token: data.token };
        localStorage.setItem('user', JSON.stringify(userData));
        onLoginSuccess(userData);
      } else {
        setError(data.message || 'Kód je nesprávný.');
      }
    } catch (error) {
      setError('Chyba při komunikaci se serverem.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', maxWidth: '400px' }}>
      <h2>Přihlášení</h2>

      {step === 1 && (
        <form onSubmit={handleRequestCode}>
          <div>
            <label>Email:</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br />
          <button type="submit">Poslat kód</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyCode}>
          <div>
            <label>Zadejte kód z e-mailu:</label><br />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <br />
          <button type="submit">Ověřit kód</button>
        </form>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}

export default LoginForm;
