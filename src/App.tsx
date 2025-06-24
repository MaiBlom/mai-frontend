import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import TetrisPage from './pages/games/TetrisPage';
import TicTacToePage from './pages/games/TicTacToePage';
import SnakePage from './pages/games/SnakePage';
import RegisterModal from 'components/modals/Register';
import LoginModal from 'components/modals/Login';

function App() {
    const [registerModal, setRegisterModal] = useState(false);
    const [loginModal, setLoginModal] = useState(false);

    const [loggedIn, setLoggedIn] = useState(false);
    const [theme, toggleTheme] = useState(true);

    return (
        <BrowserRouter basename='/'>
            <Header
                theme={theme}
                toggleTheme={() => toggleTheme(theme => !theme)}
                loggedIn={loggedIn}
                setRegisterModal={() => setRegisterModal(true)}
                setLoginModal={() => setLoginModal(true)}
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
            <RegisterModal
                theme={theme}
                show={registerModal}
                setRegisterModal={() => setRegisterModal(false)}>
            </RegisterModal>
            <LoginModal
                theme={theme}
                show={loginModal}
                setLoginModal={() => setLoginModal(false)}
                setLoggedIn={(bool: boolean) => setLoggedIn(bool)}>
            </LoginModal>
        </BrowserRouter >
    );
}

export default App;