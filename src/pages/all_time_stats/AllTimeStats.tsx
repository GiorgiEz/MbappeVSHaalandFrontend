import { Navigate, Routes, Route } from "react-router-dom";

import Career from "./Career.tsx";
import Competitions from "./Competitions.tsx";
import Age from "./Age.tsx";
import Finals from "./Finals.tsx";
import FavouriteOpponent from "./FavouriteOpponent.tsx";
import Seasons from "./Seasons.tsx";


export default function AllTimeStats() {

    return (
        <Routes>
            <Route path="career" element={<Career />}/>
            <Route path="competitions" element={<Competitions />}/>
            <Route path="seasons" element={<Seasons />}/>
            <Route path="age" element={<Age />}/>
            <Route path="finals" element={<Finals />}/>
            <Route path="favourite_opponents" element={<FavouriteOpponent />}/>

            {/* default page */}
            <Route index element={<Navigate to="all-time/career" replace/>}/>
        </Routes>
    );
}