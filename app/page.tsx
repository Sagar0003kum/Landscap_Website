import "./home.css";

export default function HomePage() {
  return (
    <main className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">Landscape Craftsmen</h1>
        <p className="hero-subtitle">
          Bringing your outdoor vision to life with professional landscaping services.
        </p>
        <button className="hero-btn">Book an Appointment</button>
      </section>

      <section className="home-section">
        <h2>Our Projects</h2>
        <p>Explore a collection of our finest work.</p>
      </section>
    </main>
  );
}
