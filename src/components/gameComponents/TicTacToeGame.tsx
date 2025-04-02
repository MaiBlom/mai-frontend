import React, { useState } from 'react';
import '../../css/tictactoe.css';

function TicTacToeGame() {
    const [board, setBoard] = useState<(string | null)[][]>([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [winner, setWinner] = useState<string | null>(null);

    const checkWinner = (board: (string | null)[][]) => {
        // Check rows, columns, and diagonals for a winner
        for (let i = 0; i < 3; i++) {
            if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0];
            }
            if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i];
            }
        }
        if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        }
        if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2];
        }
        return null;
    };

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        if (board[rowIndex][colIndex] || winner) return; // Don't allow move if the cell is already taken or if there's a winner
        const newBoard = board.map(row => row.slice()); // Create a copy of the board
        newBoard[rowIndex][colIndex] = currentPlayer;
        setBoard(newBoard);

        const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
        setCurrentPlayer(nextPlayer);

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
        }
    };

    const handleReset = () => {
        setBoard([
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ]);
        setWinner(null);
        setCurrentPlayer('X');
    };

    const renderCell = (rowIndex: number, colIndex: number) => {
        return (
            <button
                className="cell"
                onClick={() => handleCellClick(rowIndex, colIndex)}
                disabled={board[rowIndex][colIndex] !== null}
            >
                {board[rowIndex][colIndex]}
            </button>
        );
    };

    return (
        <div className="tic-tac-toe">
            <h1>Tic Tac Toe</h1>
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((_, colIndex) => (
                            <div className="cell-container" key={colIndex}>
                                {renderCell(rowIndex, colIndex)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {winner && <p className="winner-message">{winner} wins!</p>}
            {!winner && board.flat().every(cell => cell !== null) && (
                <p className="draw-message">It's a draw!</p>
            )}
            <button className="reset-button" onClick={handleReset}>Restart Game</button>
        </div>
    );
}

export default TicTacToeGame;