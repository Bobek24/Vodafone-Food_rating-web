import React, { useEffect, useState } from 'react';
import SurveyForm from './SurveyForm';

function MenuList({ userEmail, token }) {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [ratingPosition, setRatingPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/menu.json');
        const data = await res.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Chyba při načítání menu:', error);
      }
    };
    fetchMenu();
  }, [token]);

  const handleRateClick = (meal, event) => {
    setSelectedMeal(meal);
    setRatingPosition({ top: event.clientY, left: event.clientX });
  };

  const handleCloseForm = () => {
    setSelectedMeal(null);
  };

  return (
    <div>
      <h2>Dostupné obědy k hodnocení</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menuItems.map((meal) => (
          <li 
            key={meal.id} 
            style={{ 
              border: '1px solid #ccc', 
              marginBottom: '15px', 
              padding: '10px' 
            }}
          >
            <strong>{meal.nazev}</strong> <br/>
            <em>Termín: {meal.datum}</em> <br/>
            {meal.popis && <p style={{ margin: '5px 0' }}>{meal.popis}</p>}

            {meal.fotka && (
              <img 
                src={meal.fotka} 
                alt={`Foto jídla ${meal.nazev}`} 
                style={{ width: '150px', height: 'auto', marginBottom: '10px' }}
              />
            )}
            <br />

            <button onClick={(event) => handleRateClick(meal, event)}>Hodnotit</button>
          </li>
        ))}
      </ul>

      {selectedMeal && (
        <div 
          style={{
            position: 'absolute',
            top: ratingPosition.top + 10,
            left: ratingPosition.left + 10,
            zIndex: 1000,
            background: '#fff',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '10px'
          }}
        >
          <SurveyForm
            meal={selectedMeal}
            userEmail={userEmail}
            token={token}
            onClose={handleCloseForm}
          />
        </div>
      )}
    </div>
  );
}

export default MenuList;
