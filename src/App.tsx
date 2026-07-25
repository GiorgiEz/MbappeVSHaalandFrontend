import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.tsx";

import AllTimeStats from "./pages/all_time_stats/AllTimeStats";
import {ClubStats} from "./pages/club_stats/ClubStats";
import {CountryStats} from "./pages/country_stats/CountryStats";
import {Honours} from "./pages/Honours";


function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <Routes>
                    <Route path="/stats/all-time/*" element={<AllTimeStats />}/>
                    <Route path="/stats/club/*" element={<ClubStats />}/>
                    <Route path="/stats/country/*" element={<CountryStats />}/>
                    <Route path="/stats/honours" element={<Honours />}/>
                </Routes>
            </main>
        </BrowserRouter>
    );
}


export default App;