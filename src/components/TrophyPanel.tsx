import type { Trophy, TrophyEntry } from "../utils/Types.ts";
import {hexToRgba} from "../utils/helper_functions.ts"


interface Props {
    playerName: string;
    color: string;
    trophies: Trophy[];
}


function formatEntry(entry: TrophyEntry): string {
    const dateKey = "season" in entry ? "season" : "year" in entry ? "year" : null;
    const dateValue = dateKey ? String(entry[dateKey]) : null;
    const rest = Object.entries(entry)
        .filter(([key]) => key !== dateKey)
        .map(([, value]) => String(value));
    return [dateValue, ...rest].filter(Boolean).join(" · ");
}


export default function TrophyPanel({ playerName, color, trophies }: Props) {
    return (
        <div
            className="rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-900/5"
            style={{ borderTop: `4px solid ${color}` }}
        >
            <h2 className="border-b border-gray-100 p-6 text-center text-xl font-bold" style={{ color }}>
                {playerName}
            </h2>

            <div className="divide-y divide-gray-100">
                {trophies.map(trophy => {
                    return (
                        <div key={trophy.title} className="p-4 sm:p-5">
                            <div className="flex items-center justify-between gap-3">
                                <span className="font-semibold text-gray-900">{trophy.title}</span>
                                <span
                                    className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold"
                                    style={{ backgroundColor: hexToRgba(color, 0.12), color }}
                                >
                                    × {trophy.count}
                                </span>
                            </div>

                            <ul className="mt-2 space-y-1">
                                {trophy.entries.map((entry, index) => (
                                    <li key={index} className="text-sm text-gray-500">
                                        {formatEntry(entry)}
                                    </li>
                                ))}
                            </ul>

                        </div>
                    );
                })}
            </div>
        </div>
    );
}