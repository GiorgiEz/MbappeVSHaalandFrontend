import { useState } from "react";
import type { GeneralStats, OverallCompetitionStats } from "../utils/Types.ts";
import {formatValue, hexToRgba} from "../utils/helper_functions.ts";

interface Props {
    playerName: string;
    color: string;
    clubs: Record<string, OverallCompetitionStats>;
}

const QUICK_FIELDS: { key: keyof GeneralStats; label: string }[] = [
    { key: "apps", label: "Appearances" },
    { key: "goals", label: "Goals" },
    { key: "assists", label: "Assists" },
];

const DETAIL_FIELDS: { key: keyof GeneralStats; label: string }[] = [
    { key: "minutes", label: "Minutes" },
    { key: "minutes_per_goal", label: "Minutes / Goal" },
    { key: "minutes_per_goal_contribution", label: "Minutes / Contribution" },
];

export default function ClubStatsPanel({ playerName, color, clubs }: Props) {
    const clubNames = Object.keys(clubs);
    const [selectedClub, setSelectedClub] = useState(clubNames[2]);

    const clubData = clubs[selectedClub];
    const competitionNames = clubData ? Object.keys(clubData.competitions) : [];

    return (
        <div
            className="rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-900/5"
            style={{ borderTop: `4px solid ${color}` }}
        >
            <div className="border-b border-gray-100 p-6 text-center">
                <h2 className="text-xl font-bold" style={{ color }}>{playerName}</h2>
                <p className="mt-1 text-sm text-gray-400">{selectedClub}</p>
            </div>

            {/* Club tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-100 p-4 justify-center">
                {clubNames.map(club => {
                    const isActive = club === selectedClub;
                    return (
                        <button
                            key={club} onClick={() => setSelectedClub(club)} aria-pressed={isActive}
                            className="rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors
                                duration-150 hover:cursor-pointer"
                            style={
                                isActive
                                    ? { backgroundColor: color, color: "#fff" }
                                    : { backgroundColor: hexToRgba(color, 0.08), color }
                            }
                        >
                            {club}
                        </button>
                    );
                })}
            </div>

            {!clubData ? (<p className="p-6 text-center text-gray-400">No data for this club.</p>
            ) : (
                <>
                    {/* apps / goals / assists */}
                    <div className="grid grid-cols-3 gap-3 bg-gray-50/60 p-4 sm:gap-4 sm:p-6">
                        {QUICK_FIELDS.map(field => (
                            <div
                                key={field.key}
                                className="rounded-xl bg-white p-3 text-center shadow-sm ring-1 ring-gray-900/5 sm:p-4"
                            >
                                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 sm:text-xs">
                                    {field.label}
                                </p>
                                <p className="mt-2 text-lg font-bold sm:text-2xl" style={{ color }}>
                                    {formatValue(clubData.overall[field.key])}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* minutes rows */}
                    <div className="divide-y divide-gray-100 border-t border-gray-100">
                        {DETAIL_FIELDS.map(field => (
                            <div key={field.key} className="flex items-center justify-between px-6 py-3 sm:px-8">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 sm:text-sm">
                                    {field.label}
                                </span>
                                <span className="text-base font-bold text-gray-800 sm:text-lg">
                                    {formatValue(clubData.overall[field.key])}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* competitions breakdown */}
                    <div className="border-t border-gray-100 p-4 sm:p-6">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Breakdown by competition
                        </p>
                        <div className="space-y-2">
                            {competitionNames.map(name => {
                                const stats = clubData.competitions[name];
                                return (
                                    <div key={name} className="flex items-center justify-between rounded-lg px-4 py-2.5"
                                         style={{ backgroundColor: hexToRgba(color, 0.05) }}
                                    >
                                        <span className="truncate text-sm font-medium text-gray-700">{name}</span>
                                        <span className="shrink-0 text-xs text-gray-500">
                                            {formatValue(stats.apps)} apps · {formatValue(stats.goals)} G · {formatValue(stats.assists)} A
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}