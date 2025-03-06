import Leaderboard from "../../components/Leaderboard";
import TetrisGame from "../../components/gameComponents/TetrisGame";

function TetrisPage() {
    return (
        <>
            <TetrisGame />
            <Leaderboard />
        </>
    );
}

export default TetrisPage;