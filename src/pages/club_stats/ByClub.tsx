import type { PlayerClubGeneralStats } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import {MBAPPE_COLOR, HAALAND_COLOR, MBAPPE_NAME, HAALAND_NAME,} from "../../utils/Constants.ts";
import ClubStatsPanel from "../../components/ClubStatsPanel.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";


export default function ByClub() {
    return (
        <PlayerComparisonGate<PlayerClubGeneralStats> queryKey="byClub" url={JSON_URLS.club.byClub}>
            {({ mbappe, haaland }) => (
                <div className="space-y-8">
                    <h1 className="text-4xl font-bold text-center">Record by Club</h1>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <ClubStatsPanel playerName={MBAPPE_NAME} color={MBAPPE_COLOR} clubs={mbappe}/>
                        <ClubStatsPanel playerName={HAALAND_NAME} color={HAALAND_COLOR} clubs={haaland}/>
                    </div>
                </div>
            )}
        </PlayerComparisonGate>
    );
}