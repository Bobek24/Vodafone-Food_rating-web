import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css"; // Main landing page styles
import "../styles/Animations.css"; // Animations for a smooth experience
import "../styles/Responsive.css"; // Ensures mobile responsiveness
import "../styles/Typography.css"; // Clean and modern fonts
import Placeholder from "../assets/school-lunch.png";

function LandingPage() {
  return (
    <section className="section-container">
      {/* Left Side - Text */}
      <div className="section-text">
        <h2>Vítejte v Hodnocení Školních Obědů!</h2>
        <p>Pomozte nám zlepšit kvalitu školního stravování svými recenzemi.</p>
        <a href="/menu" className="cta-button">
          Prohlédnout menu
        </a>

        <h3>🍽️ Proč hodnotit školní obědy?</h3>
        <p>
          Vaše zpětná vazba pomáhá vylepšit školní stravování. Každé hodnocení
          přispívá ke změně.
        </p>

        <h3>⭐ Jak to funguje?</h3>
        <ul>
          <li>📖 Podívejte se na nabídku obědů</li>
          <li>🌟 Ohodnoťte kvalitu a chuť</li>
          <li>📊 Sledujte výsledky hodnocení</li>
          <li>💬 Sdílejte své názory</li>
        </ul>
      </div>

      {/* Right Side - Image/Icon */}
      <div className="section-image">
        <img src={Placeholder} alt="School Lunch" />
      </div>
    </section>
  );
}

export default LandingPage;
