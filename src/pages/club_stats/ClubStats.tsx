import {Route, Routes} from "react-router-dom";
import ByClub from "../club_stats/ByClub.tsx";
import BySeason from "../club_stats/BySeason.tsx";


export function ClubStats() {
    return (
        <Routes>
            <Route path="by-club" element={<ByClub />}/>
            <Route path="by-season" element={<BySeason />}/>
        </Routes>
    );
}
