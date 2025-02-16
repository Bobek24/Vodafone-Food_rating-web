import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import MenuList from './MenuList';
import SurveyResults from './SurveyResults';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  // Při načtení aplikace zkusíme načíst usera z localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Callback, který voláme při úspěšném přihlášení v LoginForm
  const handleLoginSuccess = (loggedUser) => {
    setError('');
    setUser(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Hodnocení školních obědů</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!user && (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}

      {user && !error && (
        <>
          <p>Vítejte, {user.email}</p>
          <button onClick={handleLogout}>Odhlásit</button>
          <hr />
          <MenuList userEmail={user.email} token={user.token} />
          <hr />
          <SurveyResults />
        </>
      )}
    </div>
  );
}

export default App;
