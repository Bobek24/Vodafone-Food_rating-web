import React, { useState } from 'react';

function FoodButton() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleLogin = () => {
        setIsLoggedIn((prev) => !prev);
    };

    return (
        <div className='logForm'>
            <p>{isLoggedIn ? 'Logout' : 'Login'}</p>
            <p>Status: {isLoggedIn ? 'Přihlášen' : 'Odhlášen'}</p>
            <button onClick={toggleLogin}>{isLoggedIn ? 'Odhlásit' : 'Přihlásit'}</button>
        </div>
    );
}

export default FoodButton;
