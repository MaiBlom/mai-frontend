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
    const [theme, toggleTheme] = useState(true);

    return (
        <BrowserRouter basename='/'>
            <Header
                theme={ theme }
                toggleTheme={ () => toggleTheme(theme => !theme) }
                loggedIn={ loggedIn }
                setLoggedIn={ () => setLoggedIn(loggedIn => !loggedIn) }
            />
            <div className={`app-${theme ? 'dark' : 'light'}`}>
                <React.StrictMode>
                    <Routes>
                        <Route index path={`${window.location.hostname}/`} element={<HomePage />} />
                        <Route path={`/aboutme`} element={<AboutMePage />} />

                        {/* Games */}
                        <Route path={`/tictactoe`} element={<TicTacToePage />} />
                        <Route path={`/snake`} element={<SnakePage />} />
                        <Route path={`/tetris`} element={<TetrisPage />} />
                    </Routes>
                </React.StrictMode>
            </div>
        </BrowserRouter>
    );
}

export default App;