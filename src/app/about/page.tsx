export default function AboutPage() {
  return (
    <div className="container section">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>About Castlebar Celtic FC</h1>
        
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2>Our History</h2>
          <p style={{ marginBottom: "1rem" }}>
            Founded in 1924, Castlebar Celtic FC is one of the oldest and most successful Association Football clubs in Connacht. 
            Throughout our history, we have been at the heart of the community in Castlebar, County Mayo, fostering talent and promoting the beautiful game.
          </p>
          <p>
            From our humble beginnings to competing at the highest levels of junior and amateur football in Ireland, 
            the club has consistently championed sporting excellence.
          </p>
        </div>
        
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h2>Our Grounds</h2>
          <p>
            Celtic Park is the spiritual home of the club. Our facilities include a state-of-the-art main pitch, training grounds, 
            and modern dressing rooms. We are constantly investing in our infrastructure to provide the best possible environment 
            for our players and supporters.
          </p>
        </div>
        
        <div className="grid-cols-2">
          <div className="card" style={{ borderTop: "4px solid var(--primary-color)" }}>
            <h3>Club Vision</h3>
            <p className="text-muted">To be the premier football club in the West of Ireland, recognized for youth development and community integration.</p>
          </div>
          <div className="card" style={{ borderTop: "4px solid var(--accent-color)" }}>
            <h3>Club Mission</h3>
            <p className="text-muted">To provide a safe, inclusive, and competitive environment where players can develop their football skills and character.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
