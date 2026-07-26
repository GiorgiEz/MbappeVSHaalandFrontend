import { Route, Routes } from "react-router-dom";
import Awards from "../honours/Awards.tsx";
import { useJsonStats } from "../../hooks/useJsonStats.ts";
import type { Honours } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import { HAALAND_NAME, MBAPPE_NAME } from "../../utils/Constants.ts";

export function Honours() {
    const { data, isLoading, error } = useJsonStats<Honours>("honours", JSON_URLS.honours);

    if (isLoading) return <p>Loading statistics...</p>;
    if (error || !data) return <p>Failed to load statistics.</p>;

    const mbappe = data.players.find(p => p.player === MBAPPE_NAME);
    const haaland = data.players.find(p => p.player === HAALAND_NAME);

    if (!mbappe || !haaland) return <p>Player data not found.</p>;

    return (
        <Routes>
            <Route
                path="team-trophies"
                element={
                    <Awards title="Team Trophies"
                            firstTrophies={mbappe.team_trophies}
                            secondTrophies={haaland.team_trophies}
                    />
                }
            />
            <Route
                path="individual-awards"
                element={
                    <Awards
                        title="Individual Awards"
                        firstTrophies={mbappe.individual_awards}
                        secondTrophies={haaland.individual_awards}
                    />
                }
            />
        </Routes>
    );
}