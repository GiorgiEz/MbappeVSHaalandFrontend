import type { CareerJson } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import { EMPTY_STATS } from "../../utils/Constants.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";

export default function CareerStats() {
    return (
        <PlayerComparisonGate<CareerJson> queryKey="career" url={JSON_URLS.allTime.career}>
            {({ mbappe, haaland }) => {
                const careerGroups = Array.from(
                    new Set([...Object.keys(mbappe), ...Object.keys(haaland)])
                );

                return (
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold text-center">Career Comparison</h1>

                        {careerGroups.map((group) => (
                            <StatsComparisonTable
                                key={group}
                                title={group.charAt(0).toUpperCase() + group.slice(1).toLowerCase()}
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