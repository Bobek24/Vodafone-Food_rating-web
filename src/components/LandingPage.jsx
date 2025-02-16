import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // Main landing page styles
import '../styles/Animations.css'; // Animations for a smooth experience
import '../styles/Responsive.css'; // Ensures mobile responsiveness
import '../styles/Typography.css'; // Clean and modern fonts

function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Vítejte v Hodnocení Školních Obědů!</h1>
        <p>Pomozte nám zlepšit kvalitu školního stravování svými recenzemi.</p>
        <Link to="/menu">
          <button className="btn">Prohlédnout menu</button>
        </Link>
      </header>

      <main className="landing-main">
        <section className="feature">
          <h2>🍽️ Proč hodnotit školní obědy?</h2>
          <p>Vaše zpětná vazba pomáhá vylepšit školní stravování. Každé hodnocení přispívá ke změně.</p>
        </section>

        <section className="feature">
          <h2>⭐ Jak to funguje?</h2>
          <ul>
            <li>📖 Podívejte se na nabídku obědů</li>
            <li>🌟 Ohodnoťte kvalitu a chuť</li>
            <li>📊 Sledujte výsledky hodnocení</li>
          </ul>
        </section>

        <section className="feature">
          <h2>💬 Sdílejte své názory</h2>
          <p>Společně můžeme zajistit lepší obědy pro všechny studenty!</p>
        </section>
      </main>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Hodnocení Školních Obědů. Všechna práva vyhrazena.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
