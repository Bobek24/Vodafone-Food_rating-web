import React, { useEffect, useState } from 'react';
import SurveyForm from './SurveyForm';

function MenuList({ userEmail, token }) {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        // V produkčním prostředí byste volali např. /api/menu
        // Tady se volá soubor v public složce
        const res = await fetch('/menu.json');
        const data = await res.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Chyba při načítání menu:', error);
      }
    };
    fetchMenu();
  }, [token]);

  const handleRateClick = (meal) => {
    setSelectedMeal(meal);
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

            <button onClick={() => handleRateClick(meal)}>Hodnotit</button>
          </li>
        ))}
      </ul>

      {selectedMeal && (
        <SurveyForm
          meal={selectedMeal}
          userEmail={userEmail}
          token={token}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default MenuList;
