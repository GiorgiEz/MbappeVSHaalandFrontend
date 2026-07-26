import {useJsonStats} from "../../hooks/useJsonStats.ts";
import {JSON_URLS} from "../../api/jsonUrls.ts";
import {EMPTY_STATS, HAALAND_NAME, MBAPPE_NAME} from "../../utils/Constants.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import type {AgeJson} from "../../utils/Types.ts";


export default function AgeStats(){
    const { data, isLoading, error } = useJsonStats<AgeJson>("age", JSON_URLS.allTime.age);

    if (isLoading) return <p>Loading statistics...</p>;
    if (error || !data) return <p>Failed to load statistics.</p>;

    const mbappe = data[MBAPPE_NAME];
    const haaland = data[HAALAND_NAME];

    if (!mbappe || !haaland) return <p>Player data not found.</p>;

    const ageGroups = Array.from(new Set([...Object.keys(mbappe), ...Object.keys(haaland)]))
        .sort((a, b) => Number(a) - Number(b));

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center">Comparison by Age</h1>

            {ageGroups.map(group => (
                <StatsComparisonTable
                    key={group}
                    title={"Age " + group}
                    firstPlayer={mbappe[group] ?? EMPTY_STATS}
                    secondPlayer={haaland[group] ?? EMPTY_STATS}
                />
            ))}
        </div>
    );
}