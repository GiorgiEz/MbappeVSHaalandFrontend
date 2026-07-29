import { useState } from "react";
import type { PlayerClubSeasonJson } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import { EMPTY_STATS } from "../../utils/Constants.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";


function seasonStartYear(season: string): number {
    return Number(season.split("/")[0]);
}

export default function BySeason() {
    const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

    return (
        <PlayerComparisonGate<PlayerClubSeasonJson> queryKey="bySeason" url={JSON_URLS.club.bySeason}>
            {({ mbappe, haaland }) => {
                const seasons = Array.from(
                    new Set([...Object.keys(mbappe), ...Object.keys(haaland)]))
                    .sort((a, b) => seasonStartYear(a) - seasonStartYear(b)
                );

                const activeSeason =
                    selectedSeason ?? seasons[seasons.length - 1];

                const mbappeSeason = mbappe[activeSeason];
                const haalandSeason = haaland[activeSeason];

                const competitionNames = Array.from(
                    new Set([...Object.keys(mbappeSeason?.competitions ?? {}), ...Object.keys(haalandSeason?.competitions ?? {})])
                );

                return (
                    <div className="space-y-8">
                        <Title title="Record by Season"/>

                        <div className="flex flex-wrap justify-center gap-2">
                            {seasons.map((season) => {
                                const isActive = season === activeSeason;

                                return (
                                    <button
                                        key={season}
                                        onClick={() => setSelectedSeason(season)}
                                        aria-pressed={isActive}
                                        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-150 ${
                                            isActive
                                                ? "bg-gray-900 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                    >
                                        {season}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="space-y-3">
                            <StatsComparisonTable
                                title={`Season ${activeSeason}`}
                                firstPlayer={mbappeSeason?.overall ?? EMPTY_STATS}
                                secondPlayer={haalandSeason?.overall ?? EMPTY_STATS}
                            />

                            {competitionNames.map((name) => (
                                <StatsComparisonTable
                                    key={name}
                                    title={name}
                                    firstPlayer={mbappeSeason?.competitions[name] ?? EMPTY_STATS}
                                    secondPlayer={haalandSeason?.competitions[name] ?? EMPTY_STATS}
                                />
                            ))}
                        </div>
                    </div>
                );
            }}
        </PlayerComparisonGate>
    );
}