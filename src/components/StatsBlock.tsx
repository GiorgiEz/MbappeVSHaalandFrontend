import type {GeneralStatsType} from "../utils/Types.ts";
import {HAALAND_COLOR, HAALAND_NAME, MBAPPE_COLOR, MBAPPE_NAME, NOT_LEADING_COLOR} from "../utils/Constants.ts";
import {formatValue, hexToRgba} from "../utils/helper_functions.ts";
import Title from "./Title.tsx";
import DetailedStats from "./DetailedStats.tsx";


interface StatField {
    key: Exclude<keyof GeneralStatsType, "details">
    label: string;
    higherIsBetter: boolean;
}

interface Props {
    title: string;
    firstStats: GeneralStatsType;
    secondStats: GeneralStatsType;
    text_size?: string;
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

/**
 * One self-contained stats comparison block: title + the quick-stats
 * grid (apps/goals/assists) + the detail-stats bars (minutes and
 * per-goal/contribution rates). No outer width, centering, background,
 * border, or margin, so it can be dropped into any parent's layout
 * (StatsComparisonTable, or any other page) without fighting it for
 * placement — the caller owns spacing between multiple blocks.
 */
export default function StatsBlock({ title, firstStats, secondStats }: Props) {
    const players = [
        { name: MBAPPE_NAME, stats: firstStats, other: secondStats, color: MBAPPE_COLOR },
        { name: HAALAND_NAME, stats: secondStats, other: firstStats, color: HAALAND_COLOR },
    ];

    return (
        <div className={"bg-black border-4 border-black"}>
            <Title title={title} text_size={'2xl'} />

            {/* apps / goals / assists — one side per player */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {players.map(player => (
                    <div key={player.name} className="rounded-xl p-3 sm:p-4"
                         style={{backgroundColor: hexToRgba(player.color, 0.06), borderTop: `3px solid ${player.color}`}}
                    >
                        <p className="mb-2 truncate font-bold text-xl" style={{color: player.color}}>
                            {player.name}
                        </p>
                        <div className="space-y-2">
                            {QUICK_STATS.map(field => {
                                const value = player.stats[field.key];
                                const otherValue = player.other[field.key];
                                const leads = value !== null && otherValue !== null && value > otherValue;

                                return (
                                    <div key={field.key} className="flex items-center justify-between gap-2">
                                        <span className="font-medium uppercase tracking-wide text-white text-[11px] sm:text-xs">
                                            {field.label}
                                        </span>
                                        <span
                                            className="font-bold transition-all duration-300 text-base sm:text-lg"
                                            style={leads
                                                ? {color: player.color,
                                                    textShadow: `0 0 25px ${hexToRgba(player.color, 0.6)}, 0 0 2px 
                                                    ${hexToRgba(player.color, 0.4)}`,
                                                } : {color: NOT_LEADING_COLOR}
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

            {/* minutes / minutes-per-goal / minutes-per-contribution */}
            <div className="divide-y divide-white border-t mt-3">
                {DETAIL_STATS.map(field => {
                    const firstValue = firstStats[field.key];
                    const secondValue = secondStats[field.key];
                    const leader = getLeader(firstValue, secondValue, field.higherIsBetter);

                    const total = (firstValue ?? 0) + (secondValue ?? 0);
                    const firstShare =
                        firstValue !== null && secondValue !== null && total > 0 ? (firstValue / total) * 100 : 50;

                    return (
                        <div key={field.key} className="py-3">
                            <div className="flex items-center justify-between gap-3">
                                <span
                                    className="text-right font-semibold w-16 text-base sm:w-24 sm:text-lg"
                                    style={{ color: leader === "first" ? MBAPPE_COLOR : NOT_LEADING_COLOR }}
                                >
                                    {formatValue(firstValue)}
                                </span>
                                <span className="font-semibold uppercase tracking-wide text-white text-xs sm:text-sm">
                                    {field.label}
                                </span>
                                <span className="text-left font-semibold w-16 text-base sm:w-24 sm:text-lg"
                                      style={{ color: leader === "second" ? HAALAND_COLOR : NOT_LEADING_COLOR }}
                                >
                                    {formatValue(secondValue)}
                                </span>
                            </div>

                            {field.higherIsBetter && (
                                <div className="flex overflow-hidden rounded-full bg-white mt-2 h-1.5">
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
            <DetailedStats player1={firstStats.details} player2={secondStats.details}/>
        </div>
    );
}