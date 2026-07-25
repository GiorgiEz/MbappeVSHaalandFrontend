import { useJsonStats } from "../../hooks/useJsonStats";
import StatsComparisonTable from "../../components/StatsComparisonTable";
import { JSON_URLS } from "../../api/jsonUrls";
import type { CareerJson, CareerStats } from "../../Types.ts";
import {EMPTY_STATS, MBAPPE_NAME, HAALAND_NAME} from "../../utils/Constants.ts"


export default function CareerStats() {
    const { data, isLoading, error } = useJsonStats<CareerJson>("career", JSON_URLS.allTime.career);

    if (isLoading) return <p>Loading statistics...</p>;
    if (error || !data) return <p>Failed to load statistics.</p>;

    const mbappe = data[MBAPPE_NAME];
    const haaland = data[HAALAND_NAME];

    if (!mbappe || !haaland) return <p>Player data not found.</p>;

    const careerGroups = Array.from(new Set([...Object.keys(mbappe), ...Object.keys(haaland)]));

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center">Career Comparison</h1>

            {careerGroups.map(group => (
                <StatsComparisonTable
                    key={group}
                    title={group.toUpperCase()}
                    firstPlayer={mbappe[group] ?? EMPTY_STATS}
                    secondPlayer={haaland[group] ?? EMPTY_STATS}
                />
            ))}
        </div>
    );
}