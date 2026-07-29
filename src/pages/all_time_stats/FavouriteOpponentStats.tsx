import type { FavouriteOpponentsJson, FavouriteOpponent } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import { MBAPPE_COLOR, HAALAND_COLOR, MBAPPE_NAME, HAALAND_NAME } from "../../utils/Constants.ts";
import OpponentLeaderboard from "../../components/OpponentLeaderboard.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";

export default function FavouriteOpponentStats() {
    return (
        <PlayerComparisonGate<FavouriteOpponentsJson> queryKey="favouriteOpponents"
                                                      url={JSON_URLS.allTime.favouriteOpponents}
        >
            {({ mbappe, haaland }) => {
                const mbappeOpponents: FavouriteOpponent[] = mbappe;
                const haalandOpponents: FavouriteOpponent[] = haaland;

                return (
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold text-center">Favourite Opponents</h1>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <OpponentLeaderboard
                                playerName={MBAPPE_NAME}
                                color={MBAPPE_COLOR}
                                opponents={mbappeOpponents}
                            />

                            <OpponentLeaderboard
                                playerName={HAALAND_NAME}
                                color={HAALAND_COLOR}
                                opponents={haalandOpponents}
                            />
                        </div>
                    </div>
                );
            }}
        </PlayerComparisonGate>
    );
}