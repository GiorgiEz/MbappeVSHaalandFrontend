import { Navigate, Routes, Route } from "react-router-dom";

import CareerStats from "./CareerStats";
import CompetitionStats from "./CompetitionStats";
import AgeStats from "./AgeStats";
import FinalsStats from "./FinalsStats";
import FavouriteOpponentStats from "./FavouriteOpponentStats";


export default function AllTimeStats() {

    return (
        <Routes>
            <Route path="career" element={<CareerStats />}/>
            <Route path="competitions" element={<CompetitionStats />}/>
            <Route path="age" element={<AgeStats />}/>
            <Route path="finals" element={<FinalsStats />}/>
            <Route path="opponents" element={<FavouriteOpponentStats />}/>

            {/* default page */}
            <Route index element={<Navigate to="career" replace/>}/>
        </Routes>
    );
}