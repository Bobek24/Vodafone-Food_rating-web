import React, { useEffect, useState } from 'react';

function SurveyResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const savedResponses = JSON.parse(localStorage.getItem('responses') || '[]');
    setResults(savedResponses);
  }, []);

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
                {/* Vzhled jídla = číslo 1-5 */}
                <td>{resp.vzhled} / 5</td>
                <td>{resp.priplatek} Kč</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SurveyResults;
