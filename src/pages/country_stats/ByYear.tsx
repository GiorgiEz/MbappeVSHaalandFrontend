import { useState } from "react";
import type { CountryYearJson } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import { EMPTY_STATS } from "../../utils/Constants.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";


export default function ByYear() {
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

    return (
        <PlayerComparisonGate<CountryYearJson> queryKey="byYear" url={JSON_URLS.country.byYear}>
            {({ mbappe, haaland }) => {
                const years = Array.from(
                    new Set([...Object.keys(mbappe), ...Object.keys(haaland),])
                ).sort((a, b) => Number(a) - Number(b));

                const activeYear = selectedYear ?? years[years.length - 1];

                const mbappeYear = mbappe[activeYear];
                const haalandYear = haaland[activeYear];

                const competitionNames = Array.from(
                    new Set([...Object.keys(mbappeYear?.competitions ?? {}), ...Object.keys(haalandYear?.competitions ?? {})])
                );

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
                                        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-150 ${
                                            isActive
                                                ? "bg-gray-900 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                    >
                                        {year}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="space-y-3">
                            <StatsComparisonTable
                                title={activeYear}
                                firstPlayer={mbappeYear?.overall ?? EMPTY_STATS}
                                secondPlayer={haalandYear?.overall ?? EMPTY_STATS}
                            />

                            {competitionNames.map((name) => (
                                <StatsComparisonTable
                                    key={name}
                                    title={name}
                                    firstPlayer={mbappeYear?.competitions[name] ?? EMPTY_STATS}
                                    secondPlayer={haalandYear?.competitions[name] ?? EMPTY_STATS}
                                />
                            ))}
                        </div>
                    </div>
                );
            }}
        </PlayerComparisonGate>
    );
}