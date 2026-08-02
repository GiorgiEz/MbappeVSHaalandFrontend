import type { CompetitionsType } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";
import {capitalize} from "../../utils/helper_functions.ts";
import {useState} from "react";


export default function Competitions() {
    const [selectedTeamType, setSelectedTeamType] = useState<string>("club");

    return (
        <PlayerComparisonGate<CompetitionsType> queryKey="competitions" url={JSON_URLS.allTime.competitions}>
            {({ mbappe, haaland }) => {
                const teamTypes = Array.from(
                    new Set([...Object.keys(mbappe), ...Object.keys(haaland)])
                );

                const mbappeTeamType = mbappe[selectedTeamType];
                const haalandTeamType = haaland[selectedTeamType];

                return (
                    <div className="space-y-8">
                        <Title title="Comparison by Competitions"/>

                        <div className="flex flex-wrap justify-center gap-2">
                            {teamTypes.map((teamType) => {
                                const isActive = teamType === selectedTeamType;

                                return (
                                    <button
                                        key={teamType}
                                        onClick={() => setSelectedTeamType(teamType)}
                                        aria-pressed={isActive}
                                        className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-150"
                                        style={
                                            isActive
                                                ? {backgroundColor: "#ffffff", color: "#000000"}
                                                : {backgroundColor: "#1f1f1f", color: "#9ca3af"}
                                        }
                                    >
                                        {capitalize(teamType)}
                                    </button>
                                );
                            })}
                        </div>

                        <StatsComparisonTable
                            key={selectedTeamType}
                            title={capitalize(selectedTeamType)}
                            firstPlayer={mbappeTeamType}
                            secondPlayer={haalandTeamType}
                        />
                    </div>
                );
            }}
        </PlayerComparisonGate>
    );
}