import { useMemo, useState } from "react";
import { useJsonStats } from "../../hooks/useJsonStats.ts";
import type { CountryYearJson } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import { EMPTY_STATS, HAALAND_NAME, MBAPPE_NAME } from "../../utils/Constants.ts";
import StatsComparisonTable from "../../components/StatsComparisonTable.tsx";


export default function ByYear() {
    const { data, isLoading, error } = useJsonStats<CountryYearJson>("byYear", JSON_URLS.country.byYear);

    const mbappe = data?.[MBAPPE_NAME];
    const haaland = data?.[HAALAND_NAME];

    const years = useMemo(() => {
        if (!mbappe || !haaland) return [];
        return Array.from(new Set([...Object.keys(mbappe), ...Object.keys(haaland)])).sort(
            (a, b) => Number(a) - Number(b)
        );
    }, [mbappe, haaland]);

    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const activeYear = selectedYear ?? years[years.length - 1];

    if (isLoading) return <p>Loading statistics...</p>;
    if (error || !data) return <p>Failed to load statistics.</p>;
    if (!mbappe || !haaland) return <p>Player data not found.</p>;

    const mbappeYear = mbappe[activeYear];
    const haalandYear = haaland[activeYear];

    const competitionNames = Array.from(
        new Set([
            ...Object.keys(mbappeYear?.competitions ?? {}),
            ...Object.keys(haalandYear?.competitions ?? {}),
        ])
    );

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center">Country Stats by Year</h1>

            <div className="flex flex-wrap justify-center gap-2">
                {years.map(year => {
                    const isActive = year === activeYear;
                    return (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            aria-pressed={isActive}
                            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-150 ${
                                isActive ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                {competitionNames.map(name => (
                    <div key={name} className="relative">
                        <StatsComparisonTable
                            title={name}
                            firstPlayer={mbappeYear?.competitions[name] ?? EMPTY_STATS}
                            secondPlayer={haalandYear?.competitions[name] ?? EMPTY_STATS}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}