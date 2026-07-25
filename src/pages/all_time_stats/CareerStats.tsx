import { useJsonStats } from "../../hooks/useJsonStats";
import StatsComparisonTable from "../../components/StatsComparisonTable";
import { JSON_URLS } from "../../api/jsonUrls";
import type { CareerJson, CareerStats } from "../../Types.ts";

const STAT_SECTIONS: { key: keyof CareerStats; title: string }[] = [
    { key: "career", title: "Career Totals" },
    { key: "club", title: "Club" },
    { key: "country", title: "International" },
];

export default function CareerStats() {
    const { data, isLoading, error } = useJsonStats<CareerJson>("career", JSON_URLS.allTime.career);

    if (isLoading) return <p>Loading statistics...</p>;
    if (error || !data) return <p>Failed to load statistics.</p>;

    const mbappe = data["Kylian Mbappe"];
    const haaland = data["Erling Haaland"];

    if (!mbappe || !haaland) return <p>Player data not found.</p>;

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">Career Comparison</h1>

            {STAT_SECTIONS.map(section => (
                <StatsComparisonTable
                    key={section.key}
                    title={section.title}
                    firstPlayer={mbappe[section.key]}
                    secondPlayer={haaland[section.key]}
                    firstName="Kylian Mbappé"
                    secondName="Erling Haaland"
                />
            ))}
        </div>
    );
}