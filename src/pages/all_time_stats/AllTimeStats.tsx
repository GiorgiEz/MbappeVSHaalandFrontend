import { Navigate, Routes, Route } from "react-router-dom";

import CareerStats from "./CareerStats.tsx";
import CompetitionStats from "./CompetitionStats.tsx";
import AgeStats from "./AgeStats.tsx";
import FinalsStats from "./FinalsStats.tsx";
import FavouriteOpponentStats from "./FavouriteOpponentStats.tsx";
import Seasons from "./Seasons.tsx";


export default function AllTimeStats() {

    return (
        <Routes>
            <Route path="career" element={<CareerStats />}/>
            <Route path="competitions" element={<CompetitionStats />}/>
            <Route path="seasons" element={<Seasons />}/>
            <Route path="age" element={<AgeStats />}/>
            <Route path="finals" element={<FinalsStats />}/>
            <Route path="opponents" element={<FavouriteOpponentStats />}/>

            {/* default page */}
            <Route index element={<Navigate to="all-time/career" replace/>}/>
        </Routes>
    );
}