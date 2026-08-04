import { useState } from "react";
import type { FavouriteOpponentsType, FavouriteOpponentEntry } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import {MBAPPE_COLOR, HAALAND_COLOR, MBAPPE_NAME, HAALAND_NAME} from "../../utils/Constants.ts";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";
import {capitalize} from "../../utils/helper_functions.ts";


type PlayerType = {
    name: string;
    color: string;
    opponents: FavouriteOpponentEntry[];
}


const RANK_COLORS = ["#CA8A04", "#94A3B8", "#B45309"];

function OpponentColumn({name, color, opponents}: PlayerType) {
    const maxGoals = opponents[0]?.goals ?? 0;

    return (
        <div className="border-b border-gray-100 md:border-b-0 md:border-r last:border-r-0">
            {/* Player title */}
            <div className="p-5 text-center border-b border-gray-100">
                <h3 className="text-xl font-bold" style={{ color }}>{name}</h3>
            </div>

            {/* Opponents */}
            <div className="divide-y divide-gray-100">
                {opponents.map((opponent, index) => {
                    const rankColor = RANK_COLORS[index] ?? "#E5E7EB";
                    const barWidth = maxGoals > 0 ? (opponent.goals / maxGoals) * 100 : 0;

                    return (
                        <div key={opponent.opponent} className="flex items-center gap-3 px-5 py-4">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center
                                    rounded-full border-2 text-sm font-bold"
                                style={{borderColor: rankColor, color: rankColor}}>
                                {index + 1}
                            </span>

                            <div className="min-w-0 flex-1">
                                <div className="flex justify-between gap-2">
                                    <span className="truncate text-sm font-semibold text-gray-400">
                                        {opponent.opponent}
                                    </span>

                                    <div className="shrink-0 text-xs text-gray-400">
                                        <span className="mr-2">{opponent.apps} apps </span>
                                        <span>{opponent.assists} assists </span>
                                    </div>
                                </div>

                                <div className="mt-2 flex items-center gap-2">
                                    <div className="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden">
                                        <div className="h-full rounded-full"
                                            style={{width: `${barWidth}%`, backgroundColor: color}}
                                        />
                                    </div>

                                    <span className="text-sm font-bold" style={{ color }}>
                                        {opponent.goals}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


function sortOpponents(opponents: FavouriteOpponentEntry[]): FavouriteOpponentEntry[] {
    return [...opponents].sort(
        (a, b) => b.goals - a.goals || b.apps - a.apps
    );
}

function OpponentPanel({firstPlayer, secondPlayer, category}: {firstPlayer: PlayerType; secondPlayer: PlayerType; category: string}) {
    const firstOpponents = sortOpponents(firstPlayer.opponents);
    const secondOpponents = sortOpponents(secondPlayer.opponents);

    return (
        <div className=" rounded-2xl border border-gray-100 bg-black shadow-lg shadow-gray-900/5">
            <Title title={capitalize(category)}/>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <OpponentColumn name={firstPlayer.name} color={firstPlayer.color} opponents={firstOpponents}/>
                <OpponentColumn name={secondPlayer.name} color={secondPlayer.color} opponents={secondOpponents}/>
            </div>
        </div>
    );
}


export default function FavouriteOpponent() {
    const [selectedCategory, setSelectedCategory] = useState<"club" | "country">("club");

    return (
        <PlayerComparisonGate<FavouriteOpponentsType> queryKey="favourite_opponents" url={JSON_URLS.allTime.favourite_opponents}>
            {({ mbappe, haaland }) => (
                <div className="space-y-8">
                    <Title title="Favourite Opponents"/>

                    {/* Category buttons */}
                    <div className="flex justify-center gap-3">
                        {(["club", "country"] as const).map((category) => {
                            const isActive = selectedCategory === category;

                            return (
                                <button key={category} onClick={() => setSelectedCategory(category)}
                                    className="rounded-full px-5 py-2 text-sm font-semibold capitalize transition"
                                    style={
                                        isActive
                                            ? {backgroundColor: "#ffffff", color: "#000000"}
                                            : {backgroundColor: "#1f1f1f", color: "#9ca3af"}
                                    }
                                >
                                    {capitalize(category)}
                                </button>
                            );
                        })}
                    </div>

                    {/* Comparison */}
                    <OpponentPanel
                        category={selectedCategory}
                        firstPlayer={{name: MBAPPE_NAME, color: MBAPPE_COLOR, opponents: mbappe[selectedCategory]}}
                        secondPlayer={{name: HAALAND_NAME, color: HAALAND_COLOR, opponents: haaland[selectedCategory]}}
                    />
                </div>
            )}
        </PlayerComparisonGate>
    );
}