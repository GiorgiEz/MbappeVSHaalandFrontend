import type { FinalsType } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";


export default function Finals() {
    return (
        <PlayerComparisonGate<FinalsType> queryKey="finals" url={JSON_URLS.allTime.finals}>
            {({ mbappe, haaland }) => {
                return (
                    <div className="space-y-8">
                        <Title title="Record in Finals"/>

                        <div className="space-y-3">
                            <StatsComparisonTable
                                key={0}
                                title="All Finals"
                                firstPlayer={mbappe["Y"]}
                                secondPlayer={haaland["Y"]}
                            />
                        </div>
                    </div>
                );
            }}
        </PlayerComparisonGate>
    );
}