import { Route, Routes } from "react-router-dom";
import Awards from "../honours/Awards.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import type { Honours } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";


export function Honours() {
    return (
        <PlayerComparisonGate<Honours> queryKey="honours" url={JSON_URLS.honours}>
            {({ mbappe, haaland }) => (
                <Routes>
                    <Route
                        path="team-trophies"
                        element={
                            <Awards
                                title="Team Trophies"
                                trophies1={mbappe.team_trophies}
                                trophies2={haaland.team_trophies}
                            />
                        }
                    />
                    <Route
                        path="individual-awards"
                        element={
                            <Awards
                                title="Individual Awards"
                                trophies1={mbappe.individual_awards}
                                trophies2={haaland.individual_awards}
                            />
                        }
                    />
                </Routes>
            )}
        </PlayerComparisonGate>
    );
}