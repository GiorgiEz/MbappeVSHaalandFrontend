import { StatsType } from "../../utils/types.ts";

interface StatsCardProps {
    player: string;
    stats: StatsType;
}


const StatsCard = ({ player, stats }: StatsCardProps) => {
    return (
        <div className="p-4 border rounded-lg shadow-md w-72 sm:w-56 md:w-64">
            <h2 className="text-center text-xl font-semibold mb-4">{player}</h2>

            <div className="flex space-x-4 mb-4">
                <div className="flex p-2 border rounded-md text-center">
                    <div>Goals <div className="font-bold text-2xl">{stats.goals ?? "N/A"}</div></div>
                </div>
                <div className="flex-1 p-2 border rounded-md text-center">
                    <div>Assists <div className="font-bold text-2xl">{stats.assists ?? "N/A"}</div></div>
                </div>
                <div className="flex-1 p-2 border rounded-md text-center">
                    <div>Games <div className="font-bold text-2xl">{stats.games_played ?? "N/A"}</div></div>
                </div>
            </div>

            <div className="flex flex-col space-y-1">
                <div className="text-sm rounded-md text-center">
                    <div className="flex justify-center space-x-2">
                        <p>Minutes per goal:</p>
                        <div className="font-bold">{stats.minutes_per_goal ?? "N/A"}</div>
                    </div>
                </div>
                <div className="text-sm rounded-md text-center">
                    <div className="flex justify-center space-x-2">
                        <p>Minutes per G+A:</p>
                        <div className="font-bold">{stats.minutes_per_goal_contribution ?? "N/A"}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;