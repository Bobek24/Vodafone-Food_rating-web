import React, { useEffect, useState } from 'react';

function SurveyResults() {
  const [results, setResults] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});

  useEffect(() => {
    const savedResponses = JSON.parse(localStorage.getItem('responses') || '[]');
    setResults(savedResponses);
    calculateAverages(savedResponses);
  }, []);

  const calculateAverages = (responses) => {
    const mealRatings = {};

    responses.forEach((resp) => {
      if (!mealRatings[resp.mealId]) {
        mealRatings[resp.mealId] = {
          vareni: 0,
          porce: 0,
          teplota: 0,
          vzhled: 0,
          priplatek: 0,
          count: 0,
        };
      }
      mealRatings[resp.mealId].vareni += resp.vareni;
      mealRatings[resp.mealId].porce += resp.porce;
      mealRatings[resp.mealId].teplota += resp.teplota;
      mealRatings[resp.mealId].vzhled += resp.vzhled;
      mealRatings[resp.mealId].priplatek += resp.priplatek;
      mealRatings[resp.mealId].count += 1;
    });

    Object.keys(mealRatings).forEach((mealId) => {
      const meal = mealRatings[mealId];
      mealRatings[mealId] = {
        vareni: (meal.vareni / meal.count).toFixed(1),
        porce: (meal.porce / meal.count).toFixed(1),
        teplota: (meal.teplota / meal.count).toFixed(1),
        vzhled: (meal.vzhled / meal.count).toFixed(1),
        priplatek: (meal.priplatek / meal.count).toFixed(1),
      };
    });

    setAverageRatings(mealRatings);
  };

  return (
    <div>
      <h2>Výsledky hodnocení</h2>
      {results.length === 0 ? (
        <p>Zatím žádná hodnocení.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID jídla</th>
              <th>Uživatel (částečně anonymizovaný)</th>
              <th>Vaření</th>
              <th>Porce</th>
              <th>Teplota</th>
              <th>Vzhled (hvězdičky)</th>
              <th>Příplatek</th>
            </tr>
          </thead>
          <tbody>
            {results.map((resp, index) => (
              <tr key={index}>
                <td>{resp.mealId}</td>
                <td>{resp.userEmail.replace(/(.{3}).*@/, '$1***@')}</td>
                <td>{resp.vareni}</td>
                <td>{resp.porce}</td>
                <td>{resp.teplota}</td>
                <td>{resp.vzhled} / 5</td>
                <td>{resp.priplatek} Kč</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {Object.keys(averageRatings).length > 0 && (
        <div>
          <h3>Průměrné hodnocení</h3>
          <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>ID jídla</th>
                <th>Vaření</th>
                <th>Porce</th>
                <th>Teplota</th>
                <th>Vzhled</th>
                <th>Příplatek</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(averageRatings).map((mealId) => (
                <tr key={mealId}>
                  <td>{mealId}</td>
                  <td>{averageRatings[mealId].vareni}</td>
                  <td>{averageRatings[mealId].porce}</td>
                  <td>{averageRatings[mealId].teplota}</td>
                  <td>{averageRatings[mealId].vzhled} / 5</td>
                  <td>{averageRatings[mealId].priplatek} Kč</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SurveyResults;
