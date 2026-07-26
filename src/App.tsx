import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.tsx";

import AllTimeStats from "./pages/all_time_stats/AllTimeStats";
import {ClubStats} from "./pages/club_stats/ClubStats";
import {CountryStats} from "./pages/country_stats/CountryStats";
import {Honours} from "./pages/honours/Honours.tsx";


function App() {
    return (
        <BrowserRouter>
            <Header />
            <div className="flex justify-center">
                <img
                    src="/photos/mbappe-vs-haaland-main.png"
                    alt="Mbappe vs Haaland"
                    className="w-3/8 m-2"
                />
            </div>
            <main className="max-w-7xl mx-auto px-6 py-8">
                <Routes>
                    <Route path="*" element={<AllTimeStats />}/>
                    <Route path="/all-time/*" element={<AllTimeStats />}/>
                    <Route path="/club/*" element={<ClubStats />}/>
                    <Route path="/country/*" element={<CountryStats />}/>
                    <Route path="/honours/*" element={<Honours />}/>
                </Routes>
            </main>
        </BrowserRouter>
    );
}


export default App;