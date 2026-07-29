import type { CompetitionJson } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import { EMPTY_STATS } from "../../utils/Constants.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";


export default function CompetitionStats() {
    return (
        <PlayerComparisonGate<CompetitionJson> queryKey="byCompetition" url={JSON_URLS.allTime.byCompetition}>
            {({ mbappe, haaland }) => {
                const competitionGroups = Array.from(
                    new Set([...Object.keys(mbappe), ...Object.keys(haaland)])
                );

                return (
                    <div className="space-y-8">
                        <h1 className="text-4xl font-bold text-center">Comparison by Competitions</h1>

                        {competitionGroups.map((group) => (
                            <StatsComparisonTable
                                key={group}
                                title={group}
                                firstPlayer={mbappe[group]?.overall ?? EMPTY_STATS}
                                secondPlayer={haaland[group]?.overall ?? EMPTY_STATS}
                            />
                        ))}
                    </div>
                );
            }}
        </PlayerComparisonGate>
    );
}