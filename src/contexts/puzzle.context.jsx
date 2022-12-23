import { createContext, useState, useEffect } from "react";
import { getPuzzlesAndDocuments } from "../config/firebase";

export const PuzzleContext = createContext({
    puzzleId: '',
    puzzle: {},
    setPuzzle: () => {},
    puzzles: {}

});

export const PuzzleProvider = ({children}) => {
    const [puzzle, setPuzzle] = useState(null);
    const [puzzleId, setPuzzleId] = useState('');
    const [puzzles, setPuzzles] = useState(null);
    const [emojisMapping, setEmojisMapping] = useState([]);

    useEffect(() => {
        const getPuzzlesMap = async () => {
            const puzzleMap = await getPuzzlesAndDocuments();
            console.log('the map => ', puzzleMap);
            const firsKey = Object.keys(puzzleMap)[0];
            setPuzzleId(firsKey);
            setPuzzles(puzzleMap);
        };
        getPuzzlesMap();
    },[]);

    const value = { puzzle, puzzleId, setPuzzle, puzzles }

    return <PuzzleContext.Provider value={value}>{children}</PuzzleContext.Provider>

}
