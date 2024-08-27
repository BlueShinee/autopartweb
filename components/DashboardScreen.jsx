import React from 'react';
import '../public/styles/home/home.css'; // Import CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <h1>Welcome to Our Evelocore</h1>
        <p>Discover our powerful features designed to enhance your coding and collaboration experience.</p>
      </header>
      <main className="main-content">
        <section className="feature">
          <h2>Code Editor</h2>
          <p>
            Our advanced code editor provides a seamless and powerful environment for coding. 
            Enjoy features like syntax highlighting, auto-completion, and more to streamline your 
            development workflow.
          </p>
        </section>
        <section className="feature">
          <h2>Frontend Code Stock</h2>
          <p>
            Access and manage a collection of code snippets and templates. Save time by leveraging 
            pre-written code for common tasks and organize your snippets efficiently.
          </p>
        </section>
        <section className="feature">
          <h2>Message Platform</h2>
          <p>
            Communicate and collaborate with your team or community through our integrated messaging platform. 
            Stay connected and share ideas effectively.
          </p>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
