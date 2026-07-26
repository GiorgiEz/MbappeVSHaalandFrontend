import {useJsonStats} from "../../hooks/useJsonStats.ts";
import type {CountryCompetitionJson} from "../../utils/Types.ts";
import {JSON_URLS} from "../../api/jsonUrls.ts";
import {EMPTY_STATS, HAALAND_NAME, MBAPPE_NAME} from "../../utils/Constants.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";


export default function ByCompetition (){
    const { data, isLoading, error } = useJsonStats<CountryCompetitionJson>("byCompetition", JSON_URLS.country.byCompetition);

    if (isLoading) return <p>Loading statistics...</p>;
    if (error || !data) return <p>Failed to load statistics.</p>;

    const mbappe = data[MBAPPE_NAME];
    const haaland = data[HAALAND_NAME];

    if (!mbappe || !haaland) return <p>Player data not found.</p>;

    const competitionGroups = Array.from(
        new Set([...Object.keys(mbappe.competitions), ...Object.keys(haaland.competitions)])
    );

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center">Country Competitions</h1>

            <div className="space-y-3">
                <StatsComparisonTable
                    title="Overall"
                    firstPlayer={mbappe.overall}
                    secondPlayer={haaland.overall}
                />

                {competitionGroups.map(name => (
                    <div key={name}>
                        <StatsComparisonTable
                            title={name}
                            firstPlayer={mbappe.competitions[name] ?? EMPTY_STATS}
                            secondPlayer={haaland.competitions[name] ?? EMPTY_STATS}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}