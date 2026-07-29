import type { AgeJson } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import { EMPTY_STATS } from "../../utils/Constants.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";


export default function AgeStats() {
    return (
        <PlayerComparisonGate<AgeJson> queryKey="age" url={JSON_URLS.allTime.age}>
            {({ mbappe, haaland }) => {
                const ageGroups = Array.from(
                    new Set([...Object.keys(mbappe), ...Object.keys(haaland)])
                ).sort((a, b) => Number(a) - Number(b));

                return (
                    <div className="space-y-8">
                        <Title title="Comparison by Age"/>

                        {ageGroups.map((group) => (
                            <StatsComparisonTable
                                key={group}
                                title={`Age ${group}`}
                                firstPlayer={mbappe[group] ?? EMPTY_STATS}
                                secondPlayer={haaland[group] ?? EMPTY_STATS}
                            />
                        ))}
                    </div>
                );
            }}
        </PlayerComparisonGate>
    );
}