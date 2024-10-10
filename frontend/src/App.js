import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <div className="App">
              <h1>Bienvenue dans l'application</h1>
              <nav>
                  <Link to="/register">Inscription</Link>
                  <Link to="/login">Connexion</Link>
              </nav>
              <Routes>
                  <Route path="/" element={<Home />} /> {/* Route pour la page d'accueil */}
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
              </Routes>
            </div>
        </Router>
    );  
}

export default App;
