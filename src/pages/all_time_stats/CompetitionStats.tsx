import { useJsonStats } from "../../hooks/useJsonStats.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import type { CompetitionJson } from "../../Types.ts";
import {EMPTY_STATS} from "../../Types.ts"


export default function CompetitionStats() {
    const { data, isLoading, error } = useJsonStats<CompetitionJson>(
        "byCompetition",
        JSON_URLS.allTime.byCompetition
    );

    if (isLoading) return <p>Loading statistics...</p>;
    if (error || !data) return <p>Failed to load statistics.</p>;

    const mbappe = data["Kylian Mbappe"];
    const haaland = data["Erling Haaland"];

    if (!mbappe || !haaland) return <p>Player data not found.</p>;

    const competitionGroups = Array.from(
        new Set([...Object.keys(mbappe), ...Object.keys(haaland)])
    );

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">Comparison by Competitions</h1>

            {competitionGroups.map(group => (
                <StatsComparisonTable
                    key={group}
                    title={group}
                    firstPlayer={mbappe[group]?.total ?? EMPTY_STATS}
                    secondPlayer={haaland[group]?.total ?? EMPTY_STATS}
                    firstName="Kylian Mbappé"
                    secondName="Erling Haaland"
                />
            ))}
        </div>
    );
}