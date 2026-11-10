# Experiment 14 – Fetch Student Details Using an API in React

## Aim
To develop a React application in which a user clicks **View Student Details**, the application sends a GET request to a public API, receives JSON data, and displays the student information.

## Software Requirements
- Node.js and npm
- Visual Studio Code
- Web browser
- Internet connection

## API Used
`https://jsonplaceholder.typicode.com/users/1`

JSONPlaceholder is a public testing API. It returns sample user data, not records from a real college student database.

## Algorithm
1. Start the React application.
2. Import `useState` from React.
3. Create state variables for student data, loading status, and error message.
4. When the user clicks **View Student Details**, set loading to true and clear previous data and errors.
5. Send a GET request using `fetch()` inside an asynchronous function.
6. Check `response.ok` to verify that the HTTP response is successful.
7. Convert the response body into JSON using `response.json()`.
8. Store the returned data in the student state.
9. If an error occurs, display an error message using `catch`.
10. Set loading to false in `finally`.
11. Display the student's ID, name, email address, and city.
12. Stop.

## Program

### 1. `src/App.jsx`
```jsx
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
```

### 2. `src/App.css`
```css
* { box-sizing: border-box; }
#root { min-height: 100vh; }
.app-container { min-height: 100vh; background: #f5f1e9; color: #24221e; }
.topbar { height: 76px; padding: 0 8%; background: #191815; display: flex; justify-content: space-between; align-items: center; color: #fff; border-bottom: 1px solid #39352d; }
.brand { display: flex; align-items: center; gap: 12px; font-size: 17px; font-weight: 800; letter-spacing: 2px; }
.brand-icon { width: 36px; height: 36px; border: 1px solid #c6a76b; color: #d9bd86; display: grid; place-items: center; border-radius: 9px; font-family: Georgia, serif; font-size: 21px; }
.gold { color: #d4b477; }
.api-status { color: #d9bd86; font-size: 11px; letter-spacing: 1.5px; }
.main-content { width: min(920px, 88%); margin: 0 auto; padding: 75px 0 30px; }
.intro { margin-bottom: 38px; }
.eyebrow { color: #a0834e; font-size: 11px; font-weight: 700; letter-spacing: 2px; margin-bottom: 12px; }
.intro h1 { font-family: Georgia, "Times New Roman", serif; font-size: clamp(36px, 6vw, 54px); font-weight: 500; letter-spacing: -1.5px; margin: 0; color: #211f1b; }
.intro h1 span { color: #a0834e; }
.subtitle { color: #777166; font-size: 15px; margin-top: 14px; }
.request-card, .result-card { background: #fffefa; border: 1px solid #e6dfd2; border-radius: 14px; padding: 30px; margin-bottom: 24px; box-shadow: 0 8px 30px rgba(45, 37, 24, .045); }
.section-heading, .result-heading { display: flex; justify-content: space-between; align-items: center; }
.section-heading h2, .result-heading h2 { font-family: Georgia, "Times New Roman", serif; font-size: 25px; font-weight: 500; margin: 0; }
.method, .success-status { padding: 8px 13px; border-radius: 5px; font-size: 10px; font-weight: 800; letter-spacing: 1px; }
.method { background: #eee6d5; color: #806333; }
.endpoint { margin: 25px 0 20px; padding: 17px; border: 1px solid #e8e0d2; border-radius: 7px; background: #f7f4ed; color: #665d4d; font-family: Consolas, monospace; font-size: 13px; overflow-wrap: anywhere; }
.fetch-button { width: 100%; padding: 16px 20px; background: #24221e; border: 1px solid #24221e; border-radius: 7px; color: #f8f4eb; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: .25s ease; }
.fetch-button:hover:not(:disabled) { background: #a0834e; border-color: #a0834e; color: #fff; }
.fetch-button:disabled { opacity: .65; cursor: not-allowed; }
.fetch-button span { font-size: 20px; }
.loading-message, .error-message { margin: 18px 0 0; font-size: 13px; }
.loading-message { color: #8b7043; }
.error-message { color: #b33b32; }
.success-status { background: #e9efe5; color: #526b48; }
.student-profile { display: flex; align-items: center; gap: 17px; margin: 28px 0; padding-bottom: 25px; border-bottom: 1px solid #ece6dc; }
.avatar { width: 55px; height: 55px; border-radius: 50%; display: grid; place-items: center; background: #28251f; color: #d9bd86; font-family: Georgia, serif; font-size: 25px; }
.student-profile h3 { font-family: Georgia, "Times New Roman", serif; font-size: 21px; font-weight: 500; margin: 0 0 5px; }
.student-profile p { color: #8a8377; font-size: 12px; margin: 0; }
.details-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.detail-item { padding: 19px; background: #f7f4ed; border: 1px solid #eee8dd; border-radius: 8px; min-width: 0; }
.detail-item span { display: block; color: #9b8b70; font-size: 10px; font-weight: 700; letter-spacing: 1.3px; margin-bottom: 10px; }
.detail-item strong { display: block; color: #302d27; font-size: 14px; overflow-wrap: anywhere; }
.data-note { margin-top: 20px; color: #898174; font-size: 11px; line-height: 1.5; }
footer { display: flex; justify-content: space-between; gap: 15px; padding: 25px 2px; color: #918879; font-size: 10px; letter-spacing: 1.2px; }
@media (max-width: 600px) { .topbar { padding: 0 6%; } .main-content { width: 90%; padding-top: 48px; } .request-card, .result-card { padding: 21px; } .details-grid { grid-template-columns: 1fr; } .endpoint { font-size: 11px; } footer { flex-direction: column; } }

```

### 3. `src/index.css`
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

:root {
  font-family: 'DM Sans', Arial, sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* { margin: 0; padding: 0; }
body { min-width: 320px; min-height: 100vh; }

```

### 4. `src/main.jsx`
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```

## Output
<img width="1667" height="903" alt="image" src="https://github.com/user-attachments/assets/d54f79c5-d6a4-4f9e-aa33-6e36961115b9" />

<img width="1016" height="835" alt="image" src="https://github.com/user-attachments/assets/42ba344d-7176-471c-b988-87cdffbef01c" />


## Observation
- The `fetch()` function sends an HTTP GET request to the API endpoint.
- `async` and `await` make asynchronous request handling easier to read.
- `response.ok` checks whether the HTTP response indicates success.
- `response.json()` converts the response body into a JavaScript object.
- `useState` stores the fetched student details and updates the interface.
- `catch` handles request and processing errors.
- `finally` resets the loading state whether the request succeeds or fails.

## Result
Thus, a React application was developed successfully to fetch sample student details from a REST API and display the returned JSON data using React Hooks, with loading and error handling.
