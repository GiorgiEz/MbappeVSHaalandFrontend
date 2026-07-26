import type { GeneralStats } from "../utils/Types.ts";
import {HAALAND_COLOR, MBAPPE_COLOR, HAALAND_NAME, MBAPPE_NAME, NOT_LEADING_COLOR} from "../utils/Constants.ts"
import {formatValue, hexToRgba} from "../utils/helper_functions.ts";

interface Props {
    title: string;
    firstPlayer: GeneralStats;
    secondPlayer: GeneralStats;
    compact?: boolean;
}

interface StatField {
    key: keyof GeneralStats;
    label: string;
    higherIsBetter: boolean;
}

const QUICK_STATS: StatField[] = [
    { key: "apps", label: "Appearances", higherIsBetter: true },
    { key: "goals", label: "Goals", higherIsBetter: true },
    { key: "assists", label: "Assists", higherIsBetter: true },
];

const DETAIL_STATS: StatField[] = [
    { key: "minutes", label: "Minutes", higherIsBetter: true },
    { key: "minutes_per_goal", label: "Minutes / Goal", higherIsBetter: false },
    { key: "minutes_per_goal_contribution", label: "Minutes / Contribution", higherIsBetter: false },
];

function getLeader(first: number | null, second: number | null, higherIsBetter: boolean): "first" | "second" | null {
    if (first === null || second === null || first === second) return null;
    return (higherIsBetter ? first > second : first < second) ? "first" : "second";
}

export default function StatsComparisonTable({title, firstPlayer, secondPlayer}: Props) {
    const sides = [
        { name: MBAPPE_NAME, stats: firstPlayer, other: secondPlayer, color: MBAPPE_COLOR },
        { name: HAALAND_NAME, stats: secondPlayer, other: firstPlayer, color: HAALAND_COLOR },
    ];

    return (
        <div className="rounded-4xl border border-gray-900 bg-white mx-auto w-full md:w-3/5 shadow-lg shadow-gray-900/5">
            <h2 className="border-b border-gray-100 text-center font-bold text-gray-900 p-6 text-xl">{title}</h2>

            {/* apps / goals / assists — one side per player */}
            <div className="grid grid-cols-2 border-t border-gray-100 gap-3 p-4 sm:gap-4 sm:p-6">
                {sides.map(side => (
                    <div key={side.name} className="rounded-xl p-3 sm:p-4"
                        style={{backgroundColor: hexToRgba(side.color, 0.06), borderTop: `3px solid ${side.color}`}}
                    >
                        <p className="mb-2 truncate font-bold text-xs sm:text-sm" style={{ color: side.color }}>
                            {side.name}
                        </p>
                        <div className="space-y-2">
                            {QUICK_STATS.map(field => {
                                const value = side.stats[field.key];
                                const otherValue = side.other[field.key];
                                const leads = value !== null && otherValue !== null && value > otherValue;

                                return (
                                    <div key={field.key} className="flex items-center justify-between gap-2">
                                    <span className="font-medium uppercase tracking-wide text-gray-400 text-[11px] sm:text-xs">
                                        {field.label}
                                    </span>
                                        <span
                                            className="font-bold transition-all duration-300 text-base sm:text-lg"
                                            style={
                                                leads ? {
                                                        color: side.color,
                                                        textShadow: `0 0 25px ${hexToRgba(side.color, 0.6)}, 0 0 2px 
                                                        ${hexToRgba(side.color, 0.4)}`,
                                                    }
                                                    : {color: NOT_LEADING_COLOR}
                                            }
                                        >
                                            {formatValue(value)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* minutes / minutes-per-goal / minutes-per-contribution — unchanged */}
            <div className="divide-y divide-gray-100 border-t">
                {DETAIL_STATS.map(field => {
                    const firstValue = firstPlayer[field.key];
                    const secondValue = secondPlayer[field.key];
                    const leader = getLeader(firstValue, secondValue, field.higherIsBetter);

                    const total = (firstValue ?? 0) + (secondValue ?? 0);
                    const firstShare =
                        firstValue !== null && secondValue !== null && total > 0 ? (firstValue / total) * 100 : 50;

                    return (
                        <div key={field.key} className="px-6 py-4 sm:px-8 sm:py-5">
                            <div className="flex items-center justify-between gap-3">
                                <span
                                    className="text-right font-semibold w-16 text-base sm:w-24 sm:text-lg"
                                    style={{ color: leader === "first" ? MBAPPE_COLOR : NOT_LEADING_COLOR }}
                                >
                                    {formatValue(firstValue)}
                                </span>
                                <span className="font-semibold uppercase tracking-wide text-gray-400 text-xs sm:text-sm">
                                    {field.label}
                                </span>
                                <span className="text-left font-semibold w-16 text-base sm:w-24 sm:text-lg"
                                    style={{ color: leader === "second" ? HAALAND_COLOR : NOT_LEADING_COLOR }}
                                >
                                    {formatValue(secondValue)}
                                </span>
                            </div>

                            {field.higherIsBetter && (
                                <div className="flex overflow-hidden rounded-full bg-gray-100 mt-2 h-1.5">
                                    <div className="transition-all duration-500"
                                         style={{ width: `${firstShare}%`, backgroundColor: MBAPPE_COLOR }} />
                                    <div className="bg-gray-300 transition-all duration-500"
                                         style={{ width: `${100 - firstShare}%`, backgroundColor: HAALAND_COLOR }} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}