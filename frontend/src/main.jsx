import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App.jsx";
import "./styles/global.css"; // <--- IMPORT IT HERE
// import './index.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> {/* Router must be the very top parent */}
      <App />
    </Router>
  </React.StrictMode>
);