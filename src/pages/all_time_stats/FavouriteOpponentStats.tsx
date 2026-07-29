import type { FavouriteOpponentsJson, FavouriteOpponent } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import {MBAPPE_COLOR, HAALAND_COLOR, MBAPPE_NAME, HAALAND_NAME} from "../../utils/Constants.ts";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";


const RANK_COLORS = ["#CA8A04", "#94A3B8", "#B45309"];

function sortOpponents(opponents: FavouriteOpponent[]): FavouriteOpponent[] {
    return [...opponents].sort((a, b) => b.goals - a.goals || b.apps - a.apps);
}


export default function FavouriteOpponentStats() {
    return (
        <PlayerComparisonGate<FavouriteOpponentsJson> queryKey="favouriteOpponents" url={JSON_URLS.allTime.favouriteOpponents}>
            {({ mbappe, haaland }) => {
                const players = [
                    {playerName: MBAPPE_NAME, color: MBAPPE_COLOR, opponents: sortOpponents(mbappe)},
                    {playerName: HAALAND_NAME, color: HAALAND_COLOR, opponents: sortOpponents(haaland)},
                ];

                return (
                    <div className="space-y-8">
                        <Title title="Favourite Opponents" />

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {players.map((player) => {
                                const maxGoals = player.opponents[0]?.goals ?? 0;

                                return (
                                    <div key={player.playerName}
                                        className="rounded-2xl border border-gray-100 bg-black shadow-lg shadow-gray-900/5"
                                        style={{borderTop: `4px solid ${player.color}`}}>
                                        <h2 className="border-b border-gray-100 p-6 text-center text-xl font-bold"
                                            style={{color: player.color}}
                                        >
                                            {player.playerName}
                                        </h2>

                                        <div className="divide-y divide-gray-100">
                                            {player.opponents.map(
                                                (opponent, index) => {
                                                    const rankColor = RANK_COLORS[index] ?? "#E5E7EB";
                                                    const barWidth = maxGoals > 0 ? (opponent.goals / maxGoals) * 100 : 0;

                                                    return (
                                                        <div key={opponent.opponent}
                                                            className="flex items-center gap-4 px-6 py-4">
                                                            <span
                                                                className="flex h-8 w-8 shrink-0 items-center justify-center
                                                                rounded-full border-2 text-sm font-bold"
                                                                style={{borderColor: rankColor, color: rankColor}}
                                                            >
                                                                {index + 1}
                                                            </span>

                                                            <div className="min-w-0 flex-1">
                                                                <div className="flex items-baseline justify-between gap-2">
                                                                    <span className="truncate font-semibold text-gray-400">
                                                                        {opponent.opponent}
                                                                    </span>

                                                                    <span className="shrink-0 text-sm text-gray-400">
                                                                        {opponent.apps}{" "}apps ·{" "}{opponent.assists}{" "}assists
                                                                    </span>
                                                                </div>

                                                                <div className="mt-1.5 flex items-center gap-2">
                                                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                                                                        <div className="h-full rounded-full transition-all duration-500"
                                                                            style={{width: `${barWidth}%`, backgroundColor: player.color}}
                                                                        />
                                                                    </div>

                                                                    <span className="w-6 shrink-0 text-right text-sm font-bold"
                                                                        style={{color: player.color}}
                                                                    >
                                                                        {opponent.goals}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            }}
        </PlayerComparisonGate>
    );
}