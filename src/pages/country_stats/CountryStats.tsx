import {Route, Routes} from "react-router-dom";
import Competitions from "./Competitions.tsx";
import Years from "./Years.tsx";

export function CountryStats() {
    return (
        <div>
            <Routes>
                <Route path="competitions" element={<Competitions />}/>
                <Route path="years" element={<Years />}/>
            </Routes>
        </div>
    )
}
