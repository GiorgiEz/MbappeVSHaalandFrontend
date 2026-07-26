import { useMemo, useState } from "react";
import { useJsonStats } from "../../hooks/useJsonStats.ts";
import type { PlayerClubSeasonJson } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import { EMPTY_STATS, HAALAND_NAME, MBAPPE_NAME } from "../../utils/Constants.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";

function seasonStartYear(season: string): number {
    return Number(season.split("/")[0]);
}

export default function BySeason() {
    const { data, isLoading, error } = useJsonStats<PlayerClubSeasonJson>("bySeason", JSON_URLS.club.bySeason);

    const mbappe = data?.[MBAPPE_NAME];
    const haaland = data?.[HAALAND_NAME];

    const seasons = useMemo(() => {
        if (!mbappe || !haaland) return [];
        return Array.from(new Set([...Object.keys(mbappe), ...Object.keys(haaland)])).sort(
            (a, b) => seasonStartYear(a) - seasonStartYear(b)
        );
    }, [mbappe, haaland]);

    const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
    const activeSeason = selectedSeason ?? seasons[seasons.length - 1];

    if (isLoading) return <p>Loading statistics...</p>;
    if (error || !data) return <p>Failed to load statistics.</p>;
    if (!mbappe || !haaland) return <p>Player data not found.</p>;

    const mbappeSeason = mbappe[activeSeason];
    const haalandSeason = haaland[activeSeason];

    const competitionNames = Array.from(
        new Set([
            ...Object.keys(mbappeSeason?.competitions ?? {}),
            ...Object.keys(haalandSeason?.competitions ?? {}),
        ])
    );

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center">Record by Season</h1>

            {/* Season selector */}
            <div className="flex flex-wrap justify-center gap-2">
                {seasons.map(season => {
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

                {competitionNames.map(name => (
                    <div key={name}>
                        <StatsComparisonTable
                            title={name}
                            firstPlayer={mbappeSeason?.competitions[name] ?? EMPTY_STATS}
                            secondPlayer={haalandSeason?.competitions[name] ?? EMPTY_STATS}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}