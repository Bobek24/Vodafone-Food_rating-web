import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";

function SurveyForm({ meal, userEmail, token, onClose }) {
  const [formData, setFormData] = useState({
    vareni: "",
    porce: "",
    teplota: "",
    starRating: 0, // Hvězdičkové hodnocení
    priplatek: 0,
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    // Kontrola, zda uživatel již hodnotil toto jídlo
    const savedResponses = JSON.parse(localStorage.getItem("responses") || "[]");
    const alreadyRated = savedResponses.find(
      (resp) => resp.userEmail === userEmail && resp.mealId === meal.id
    );
    if (alreadyRated) {
      setHasSubmitted(true);
    }
  }, [userEmail, meal.id]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Fix: Ensure priplatek is within the 0-20 range and allows any number
    if (name === "priplatek") {
      value = Math.max(0, Math.min(20, Number(value))); // Restricts between 0 and 20
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStarRatingChange = (newRating) => {
    setFormData((prev) => ({ ...prev, starRating: newRating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Uložit odpovědi do localStorage (v produkci by zde byl API request)
    const savedResponses = JSON.parse(localStorage.getItem("responses") || "[]");
    savedResponses.push({
      mealId: meal.id,
      userEmail,
      vareni: formData.vareni,
      porce: formData.porce,
      teplota: formData.teplota,
      vzhled: formData.starRating,
      priplatek: formData.priplatek,
    });

    localStorage.setItem("responses", JSON.stringify(savedResponses));
    setHasSubmitted(true);
  };

  if (hasSubmitted) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "20px", marginTop: "10px" }}>
        <h3>{meal.nazev}</h3>
        <p>Děkujeme za Vaše hodnocení! (Již jste hodnotili.)</p>
        <button onClick={onClose}>Zavřít</button>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", marginTop: "10px" }}>
      <h3>Hodnocení: {meal.nazev}</h3>
      <form onSubmit={handleSubmit}>
        {/* 1) Vařit / nevařit */}
        <label>
          Vařit či nevařit?
          <select name="vareni" value={formData.vareni} onChange={handleChange} required>
            <option value="">--Vyberte--</option>
            <option value="varit">Vařit</option>
            <option value="nevarit">Nevařit</option>
          </select>
        </label>
        <br />
        <br />

        {/* 2) Porce */}
        <label>Velikost porce:</label>
        <div>
          <label>
            <input
              type="radio"
              name="porce"
              value="hlad"
              checked={formData.porce === "hlad"}
              onChange={handleChange}
              required
            />
            Měl jsem hlad
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="porce"
              value="akorat"
              checked={formData.porce === "akorat"}
              onChange={handleChange}
            />
            Akorát
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="porce"
              value="prejedl"
              checked={formData.porce === "prejedl"}
              onChange={handleChange}
            />
            Přejedl jsem se
          </label>
        </div>
        <br />

        {/* 3) Teplota jídla */}
        <label>Teplota jídla:</label>
        <div>
          <label>
            <input
              type="radio"
              name="teplota"
              value="studene"
              checked={formData.teplota === "studene"}
              onChange={handleChange}
              required
            />
            Studené (nepřijatelné)
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="teplota"
              value="akorat"
              checked={formData.teplota === "akorat"}
              onChange={handleChange}
            />
            Akorát
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="teplota"
              value="horke"
              checked={formData.teplota === "horke"}
              onChange={handleChange}
            />
            Horké
          </label>
        </div>
        <br />

        {/* 4) Vzhled jídla (hvězdičkové hodnocení) */}
        <label>Vzhled jídla (hvězdičky):</label>
        <div style={{ margin: "10px 0" }}>
          <StarRating rating={formData.starRating} onRatingChange={handleStarRatingChange} />
        </div>

        {/* 5) Kolik byste si chtěli připlatit */}
        <label>
          Kolik byste si chtěli připlatit? (Kč)
          <input
            type="number"
            name="priplatek"
            value={formData.priplatek}
            onChange={handleChange}
            min="0"
            max="20"
            step="1" // Fix: Allows any number, not just multiples of 5
            required
          />
        </label>
        <br />
        <br />

        <button type="submit">Odeslat hodnocení</button>
        <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
          Zavřít
        </button>
      </form>
    </div>
  );
}

export default SurveyForm;
