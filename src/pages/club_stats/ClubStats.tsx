import {Route, Routes} from "react-router-dom";
import Clubs from "./Clubs.tsx";
import Seasons from "./Seasons.tsx";
import Competitions from "../club_stats/Competitions.tsx";


export function ClubStats() {
    return (
        <Routes>
            <Route path="clubs" element={<Clubs />}/>
            <Route path="competitions" element={<Competitions />}/>
            <Route path="seasons" element={<Seasons />}/>
        </Routes>
    );
}
