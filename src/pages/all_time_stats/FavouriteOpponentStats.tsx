import { useJsonStats } from "../../hooks/useJsonStats.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import { HAALAND_NAME, MBAPPE_NAME, MBAPPE_COLOR, HAALAND_COLOR } from "../../utils/Constants.ts";
import OpponentLeaderboard from "../../components/OpponentLeaderboard.tsx";
import type { FavouriteOpponentsJson, FavouriteOpponent } from "../../utils/Types.ts";


export default function FavouriteOpponentStats() {
    const { data, isLoading, error } = useJsonStats<FavouriteOpponentsJson>(
        "favouriteOpponents", JSON_URLS.allTime.favouriteOpponents
    );

    if (isLoading) return <p>Loading statistics...</p>;
    if (error || !data) return <p>Failed to load statistics.</p>;

    const mbappe: FavouriteOpponent[] = data[MBAPPE_NAME];
    const haaland: FavouriteOpponent[] = data[HAALAND_NAME];

    if (!mbappe || !haaland) return <p>Player data not found.</p>;

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center">Favourite Opponents</h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <OpponentLeaderboard playerName={MBAPPE_NAME} color={MBAPPE_COLOR} opponents={mbappe} />
                <OpponentLeaderboard playerName={HAALAND_NAME} color={HAALAND_COLOR} opponents={haaland} />
            </div>
        </div>
    );
}