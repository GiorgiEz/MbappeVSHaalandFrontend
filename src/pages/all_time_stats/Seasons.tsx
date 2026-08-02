import { useState } from "react";
import type { SeasonsType } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";


function seasonStartYear(season: string): number {
    return Number(season.split("/")[0]);
}

export default function Seasons() {
    const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

    return (
        <PlayerComparisonGate<SeasonsType> queryKey="seasons" url={JSON_URLS.allTime.seasons}>
            {({ mbappe, haaland }) => {
                const seasons = Array.from(
                    new Set([...Object.keys(mbappe), ...Object.keys(haaland)]))
                    .sort((a, b) => seasonStartYear(a) - seasonStartYear(b)
                    );

                const activeSeason = selectedSeason ?? seasons[seasons.length - 1];
                const mbappeSeason = mbappe[activeSeason];
                const haalandSeason = haaland[activeSeason];

                return (
                    <div className="space-y-8">
                        <Title title="Record by Season - Club & Country"/>

                        <div className="flex flex-wrap justify-center gap-2">
                            {seasons.map((season) => {
                                const isActive = season === activeSeason;

                                return (
                                    <button
                                        key={season}
                                        onClick={() => setSelectedSeason(season)}
                                        aria-pressed={isActive}
                                        className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-150"
                                        style={
                                            isActive
                                                ? {backgroundColor: "#ffffff", color: "#000000"}
                                                : {backgroundColor: "#1f1f1f", color: "#9ca3af"}
                                        }
                                    >
                                        {season}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="space-y-3">
                            <StatsComparisonTable
                                title={`Season ${activeSeason}`}
                                firstPlayer={mbappeSeason}
                                secondPlayer={haalandSeason}
                            />
                        </div>
                    </div>
                );
            }}
        </PlayerComparisonGate>
    );
}