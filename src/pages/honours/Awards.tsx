import type { Trophy } from "../../utils/Types.ts";
import {HAALAND_NAME, MBAPPE_NAME, MBAPPE_COLOR, HAALAND_COLOR,} from "../../utils/Constants.ts";
import { hexToRgba } from "../../utils/helper_functions.ts";
import Title from "../../components/Title.tsx";


function formatEntry(entry: TrophyEntry): string {
    const dateKey = "season" in entry ? "season" : "year" in entry ? "year" : null;
    const dateValue = dateKey ? String(entry[dateKey]) : null;
    const rest = Object.entries(entry)
        .filter(([key]) => key !== dateKey)
        .map(([, value]) => String(value));
    return [dateValue, ...rest].filter(Boolean).join(" · ");
}

export default function Awards({title, trophies1, trophies2}: {title: string; trophies1: Trophy[]; trophies2: Trophy[]}){
    const players = [
        {playerName: MBAPPE_NAME, color: MBAPPE_COLOR, trophies: trophies1},
        {playerName: HAALAND_NAME, color: HAALAND_COLOR, trophies: trophies2},
    ];

    return (
        <div className="space-y-8">
            <Title title={title}/>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {players.map((player) => (
                    <div
                        key={player.playerName}
                        className="rounded-2xl border border-gray-100 bg-black shadow-lg shadow-gray-900/5"
                        style={{borderTop: `4px solid ${player.color}`}}
                    >
                        <h2
                            className="border-b border-gray-100 p-6 text-center text-xl font-bold"
                            style={{color: player.color}}
                        >
                            {player.playerName}
                        </h2>

                        <div className="divide-y divide-gray-100">
                            {player.trophies.map((trophy) => (
                                <div key={`${player.playerName}-${trophy.title}`} className="p-4 sm:p-5">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="font-semibold text-gray-400">{trophy.title}</span>

                                        <span
                                            className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold"
                                            style={{
                                                backgroundColor: hexToRgba(player.color, 0.12),
                                                color: player.color,
                                            }}
                                        >
                                            × {trophy.count}
                                        </span>
                                    </div>

                                    <ul className="mt-2 space-y-1">
                                        {trophy.entries.map((entry, index) => (
                                                <li key={index} className="text-sm text-gray-500">
                                                    {formatEntry(entry)}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}