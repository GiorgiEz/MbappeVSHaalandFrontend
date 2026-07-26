import {Route, Routes} from "react-router-dom";
import ByCompetition from "../country_stats/ByCompetition.tsx";
import ByYear from "../country_stats/ByYear.tsx";

export function CountryStats() {
    return (
        <div>
            <Routes>
                <Route path="by-competition" element={<ByCompetition />}/>
                <Route path="by-year" element={<ByYear />}/>
            </Routes>
        </div>
    )
}
