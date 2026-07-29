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
            )}
        </PlayerComparisonGate>
    );
}