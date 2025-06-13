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
                            <Route index path={window.location.pathname} element={<HomePage />} />
                            <Route path={`${window.location.pathname}aboutme`} element={<AboutMePage />} />

                            {/* Games */}
                            <Route path={`${window.location.pathname}tictactoe`} element={<TicTacToePage />} />
                            <Route path={`${window.location.pathname}snake`} element={<SnakePage />} />
                            <Route path={`${window.location.pathname}tetris`} element={<TetrisPage />} />
                        </Routes>
                </header>
            </React.StrictMode>
        </BrowserRouter>
    );
}

export default App;