import type { CountryCompetitionJson } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import { EMPTY_STATS } from "../../utils/Constants.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";


export default function ByCompetition() {
    return (
        <PlayerComparisonGate<CountryCompetitionJson> queryKey="byCompetition" url={JSON_URLS.country.byCompetition}>
            {({ mbappe, haaland }) => {
                const competitionNames = Array.from(
                    new Set([...Object.keys(mbappe.competitions), ...Object.keys(haaland.competitions)])
                );

                return (
                    <div className="space-y-8">
                        <Title title="Country Competitions"/>

                        <div className="space-y-3">
                            <StatsComparisonTable
                                title="Overall" firstPlayer={mbappe.overall} secondPlayer={haaland.overall}
                            />
                            {competitionNames.map(name => (
                                <div key={name} className="relative">
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
            }}
        </PlayerComparisonGate>
    );
}