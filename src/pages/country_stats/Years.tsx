import { useState } from "react";
import type { YearsType } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";


export default function Years() {
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

    return (
        <PlayerComparisonGate<YearsType> queryKey="byYear" url={JSON_URLS.country.years}>
            {({ mbappe, haaland }) => {
                const years = Array.from(
                    new Set([...Object.keys(mbappe), ...Object.keys(haaland),])
                ).sort((a, b) => Number(a) - Number(b));

                const activeYear = selectedYear ?? years[years.length - 1];
                const mbappeYear = mbappe[activeYear];
                const haalandYear = haaland[activeYear];

                return (
                    <div className="space-y-8">
                        <Title title="Country Stats by Year"/>

                        <div className="flex flex-wrap justify-center gap-2">
                            {years.map((year) => {
                                const isActive = year === activeYear;

                                return (
                                    <button
                                        key={year}
                                        onClick={() => setSelectedYear(year)}
                                        aria-pressed={isActive}
                                        className="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-150"
                                        style={
                                            isActive
                                                ? {backgroundColor: "#ffffff", color: "#000000"}
                                                : {backgroundColor: "#1f1f1f", color: "#9ca3af"}
                                        }
                                    >
                                        {year}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="space-y-3">
                            <StatsComparisonTable
                                title={activeYear}
                                firstPlayer={mbappeYear}
                                secondPlayer={haalandYear}
                            />
                        </div>
                    </div>
                );
            }}
        </PlayerComparisonGate>
    );
}