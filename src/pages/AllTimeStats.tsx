import { useEffect, useState } from "react";
import { AllTimeStatsType } from "../utils/types.ts";
import PlayerStatsContainer from "./Stats/PlayerStatsContainer.tsx";


const all_time_stats_url =
    "https://raw.githubusercontent.com/GiorgiEz/MbappeHaalandViniStatsJson/main/all_time_stats.json";

const AllTimeStats = () => {
    const [stats, setStats] = useState<AllTimeStatsType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(all_time_stats_url);
                if (!response.ok) throw new Error("Failed to fetch stats.");

                const data: AllTimeStatsType = await response.json();
                setStats(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-4">All-Time Stats</h1>

            {loading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {stats && (
                <div className="flex justify-center py-6">
                    <PlayerStatsContainer stats={stats} />
                </div>
            )}
        </div>
    );
};

export default AllTimeStats;
