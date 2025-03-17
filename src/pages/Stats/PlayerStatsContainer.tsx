import StatsCard from "./StatsCard";
import {AllTimeStatsType} from "../../utils/types.ts";



const PlayerStatsContainer = ({ stats }: {stats: AllTimeStatsType}) => {
    const players = ['Erling Haaland', 'Kylian Mbappe', 'Vinicius Junior']

    return (
        <div className="space-y-4">
            <div className="p-2 justify-center">
                <div className="text-center text-2xl font-bold p-4">ALL TIME CAREER</div>
                <div className="flex">{
                    players.map((player: string) => (
                        <div key={player}>
                            <StatsCard player={player} stats={stats[player].all_time} />
                        </div>
                    ))
                }
                </div>
            </div>

            <div className="p-2 justify-center">
                <div className="text-center text-2xl font-bold p-4">ALL TIME CLUB</div>
                <div className="flex">{
                    players.map((player: string) => (
                        <div key={player}>
                            <StatsCard player={player} stats={stats[player].club_all_time.all_time} />
                        </div>
                    ))
                }
                </div>
            </div>

            <div className="p-2 justify-center">
                <div className="text-center text-2xl font-bold p-4">ALL TIME COUNTRY</div>
                <div className="flex">{
                    players.map((player: string) => (
                        <div key={player}>
                            <StatsCard player={player} stats={stats[player].country_all_time.all_time} />
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    );
};

export default PlayerStatsContainer;