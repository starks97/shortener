export default function ComingSoon() {
  return (
    <section className="coming-soon">
      <div className="coming-soon_content">
        <h1 className="coming-soon_title">Coming Soon!</h1>
        <p className="coming-soon_description">
          Exciting things are on the way. Stay tuned for updates and get ready
          to experience the next big thing with ByteTrim.
        </p>
        <form className="subscribe-form">
          <input
            type="email"
            placeholder="Enter your email"
            className="email-input"
            required
          />
          <button type="submit" className="subscribe-button">
            Notify Me
          </button>
        </form>
      </div>
    </section>
  );
}
