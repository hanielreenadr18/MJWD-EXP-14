import { useState } from "react";
import "./App.css";

function App() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getStudentDetails() {
    setLoading(true);
    setError("");
    setStudent(null);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch student details");
      }

      const data = await response.json();
      setStudent(data);
    } catch (err) {
      setError("Unable to load details. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon">S</span>
          <span>STUDENT<span className="gold">DATA</span></span>
        </div>
        <span className="api-status">● API INTEGRATION</span>
      </header>

      <main className="main-content">
        <section className="intro">
          <p className="eyebrow">EXPERIMENT 14 / REACT JS</p>
          <h1>Student <span>Information</span></h1>
          <p className="subtitle">
            Fetch and display student information using a REST API.
          </p>
        </section>

        <section className="request-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">DATA SOURCE</p>
              <h2>API Request</h2>
            </div>
            <span className="method">GET</span>
          </div>

          <div className="endpoint">
            https://jsonplaceholder.typicode.com/users/1
          </div>

          <button
            className="fetch-button"
            onClick={getStudentDetails}
            disabled={loading}
          >
            {loading ? "Fetching Details..." : "View Student Details"}
            <span>→</span>
          </button>

          {loading && (
            <p className="loading-message" role="status">
              Please wait. Fetching data from the API...
            </p>
          )}

          {error && <p className="error-message" role="alert">{error}</p>}
        </section>

        {student && (
          <section className="result-card">
            <div className="result-heading">
              <div>
                <p className="eyebrow">API RESPONSE</p>
                <h2>Student Details</h2>
              </div>
              <span className="success-status">SUCCESS</span>
            </div>

            <div className="student-profile">
              <div className="avatar">{student.name.charAt(0)}</div>
              <div>
                <h3>{student.name}</h3>
                <p>Student ID: {student.id}</p>
              </div>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <span>STUDENT ID</span>
                <strong>{student.id}</strong>
              </div>
              <div className="detail-item">
                <span>FULL NAME</span>
                <strong>{student.name}</strong>
              </div>
              <div className="detail-item">
                <span>EMAIL ADDRESS</span>
                <strong>{student.email}</strong>
              </div>
              <div className="detail-item">
                <span>CITY</span>
                <strong>{student.address.city}</strong>
              </div>
            </div>
            <p className="data-note">
              Sample data returned by JSONPlaceholder. This is not a real college database.
            </p>
          </section>
        )}

        <footer>
          <span>REACT JS · FETCH API · USESTATE</span>
          <span>EXPERIMENT 14</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
