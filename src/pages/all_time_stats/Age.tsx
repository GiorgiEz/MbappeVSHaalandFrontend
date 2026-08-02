import { useState } from "react";
import type { AgeType } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";


export default function Age() {
    const [selectedAge, setSelectedAge] = useState("15");

    return (
        <PlayerComparisonGate<AgeType> queryKey="age" url={JSON_URLS.allTime.age}>
            {({ mbappe, haaland }) => {
                const ageGroups = Array.from(
                    new Set([...Object.keys(mbappe), ...Object.keys(haaland)])
                ).sort((a, b) => Number(a) - Number(b));

                return (
                    <div className="space-y-8">
                        <Title title="Comparison by Age"/>

                        {/* Age selector */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {ageGroups.map((age) => {
                                const isActive = selectedAge === age;

                                return (
                                    <button key={age} onClick={() => setSelectedAge(age)}
                                        className="rounded-full px-5 py-2 text-sm font-semibold transition"
                                        style={
                                            isActive
                                                ? {backgroundColor: "#ffffff", color: "#000000"}
                                                : {backgroundColor: "#1f1f1f", color: "#9ca3af"}
                                        }
                                    >
                                        Age {age}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Selected age stats */}
                        {selectedAge && (
                            <StatsComparisonTable
                                title={`Age ${selectedAge}`}
                                firstPlayer={mbappe[selectedAge]}
                                secondPlayer={haaland[selectedAge]}
                            />
                        )}
                    </div>
                );
            }}

        </PlayerComparisonGate>
    );
}