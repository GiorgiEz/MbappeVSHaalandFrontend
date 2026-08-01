import {Route, Routes} from "react-router-dom";
import ByClub from "../club_stats/ByClub.tsx";
import BySeason from "../club_stats/BySeason.tsx";
import Competitions from "../club_stats/Competitions.tsx";


export function ClubStats() {
    return (
        <Routes>
            <Route path="by-club" element={<ByClub />}/>
            <Route path="competitions" element={<Competitions />}/>
            <Route path="by-season" element={<BySeason />}/>
        </Routes>
    );
}
