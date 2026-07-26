import { useJsonStats } from "../../hooks/useJsonStats.ts";
import type { PlayerClubGeneralStats } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import { HAALAND_NAME, MBAPPE_NAME, MBAPPE_COLOR, HAALAND_COLOR } from "../../utils/Constants.ts";
import ClubStatsPanel from "../../components/ClubStatsPanel.tsx";

export default function ByClub() {
    const { data, isLoading, error } = useJsonStats<PlayerClubGeneralStats>("byClub", JSON_URLS.club.byClub);

    if (isLoading) return <p>Loading statistics...</p>;
    if (error || !data) return <p>Failed to load statistics.</p>;

    const mbappe = data[MBAPPE_NAME];
    const haaland = data[HAALAND_NAME];

    if (!mbappe || !haaland) return <p>Player data not found.</p>;

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center">Record by Club</h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ClubStatsPanel playerName={MBAPPE_NAME} color={MBAPPE_COLOR} clubs={mbappe} />
                <ClubStatsPanel playerName={HAALAND_NAME} color={HAALAND_COLOR} clubs={haaland} />
            </div>
        </div>
    );
}