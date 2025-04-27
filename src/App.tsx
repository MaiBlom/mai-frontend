import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import TetrisPage from './pages/games/TetrisPage';
import TicTacToePage from './pages/games/TicTacToePage';
import SnakePage from './pages/games/SnakePage';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [darkLightMode, setDarkLightMode] = useState(true);

    return (
        <BrowserRouter>
            <Header
                darkLightMode={ darkLightMode }
                toggleDarkLightMode={ () => setDarkLightMode(darkLightMode => !darkLightMode) }
                loggedIn={ loggedIn }
                setLoggedIn={ () => setLoggedIn(loggedIn => !loggedIn) }
            />
            <React.StrictMode>
                <header className={`app-header-${darkLightMode ? 'dark' : 'light'}`}>
                        <Routes>
                            <Route index path="Home" element={<HomePage />} />
                            <Route path="AboutMe" element={<AboutMePage />} />

                            {/* Games */}
                            <Route path="TicTacToe" element={<TicTacToePage />} />
                            <Route path="Snake" element={<SnakePage />} />
                            <Route path="Tetris" element={<TetrisPage />} />
                        </Routes>
                </header>
            </React.StrictMode>
        </BrowserRouter>
    );
}

export default App;