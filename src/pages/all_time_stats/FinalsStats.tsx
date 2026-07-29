import type { FinalsJson } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import { EMPTY_STATS } from "../../utils/Constants.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";


export default function FinalsStats() {
    return (
        <PlayerComparisonGate<FinalsJson> queryKey="finals" url={JSON_URLS.allTime.finals}>
            {({ mbappe, haaland }) => {
                const competitionNames = Array.from(
                    new Set([...Object.keys(mbappe.competitions), ...Object.keys(haaland.competitions)])
                );

                return (
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold text-center">Record in Finals</h1>

                        <div className="space-y-3">
                            <StatsComparisonTable
                                title="Overall" firstPlayer={mbappe.overall} secondPlayer={haaland.overall}
                            />

                            {competitionNames.map((name) => (
                                <StatsComparisonTable
                                    key={name}
                                    title={name}
                                    firstPlayer={mbappe.competitions[name] ?? EMPTY_STATS}
                                    secondPlayer={haaland.competitions[name] ?? EMPTY_STATS}
                                />
                            ))}
                        </div>
                    </div>
                );
            }}
        </PlayerComparisonGate>
    );
}