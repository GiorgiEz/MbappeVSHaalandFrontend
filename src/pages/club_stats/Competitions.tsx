import type { CompetitionsType } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";
import {capitalize} from "../../utils/helper_functions.ts";


export default function ByCompetition() {
    return (
        <PlayerComparisonGate<CompetitionsType> queryKey="competitions" url={JSON_URLS.allTime.competitions}>
            {({ mbappe, haaland }) => {
                const teamType = "club"

                return (
                    <div className="space-y-8">
                        <Title title="Comparison by Competitions"/>

                        <StatsComparisonTable
                            key={teamType}
                            title={capitalize(teamType)}
                            firstPlayer={mbappe[teamType]}
                            secondPlayer={haaland[teamType]}
                        />
                    </div>
                );
            }}
        </PlayerComparisonGate>
    );
}