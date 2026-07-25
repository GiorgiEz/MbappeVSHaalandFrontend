import type { GeneralStats } from "../Types.ts";

interface Props {
    title: string;
    firstPlayer: GeneralStats;
    secondPlayer: GeneralStats;
    firstName: string;
    secondName: string;
}

interface StatField {
    key: keyof GeneralStats;
    label: string;
    higherIsBetter: boolean;
}

// Row order per your spec: name row → apps/assists/goals row → minutes → minutes/goal → minutes/contribution
const QUICK_STATS: StatField[] = [
    { key: "apps", label: "Appearances", higherIsBetter: true },
    { key: "assists", label: "Assists", higherIsBetter: true },
    { key: "goals", label: "Goals", higherIsBetter: true },
];

const DETAIL_STATS: StatField[] = [
    { key: "minutes", label: "Minutes", higherIsBetter: true },
    { key: "minutes_per_goal", label: "Minutes / Goal", higherIsBetter: false },
    { key: "minutes_per_goal_contribution", label: "Minutes / Contribution", higherIsBetter: false },
];

function formatValue(value: number | null): string {
    if (value === null) return "-";
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
}

function getLeader(first: number | null, second: number | null, higherIsBetter: boolean): "first" | "second" | null {
    if (first === null || second === null || first === second) return null;
    return (higherIsBetter ? first > second : first < second) ? "first" : "second";
}

export default function StatsComparisonTable({title, firstPlayer, secondPlayer, firstName, secondName,}: Props) {
    return (
        <div className="mx-auto w-full md:w-3/5 rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-900/5">
            <h2 className="border-b border-gray-100 p-6 text-center text-xl font-bold text-gray-900">
                {title}
            </h2>

            {/* Names row */}
            <div className="flex items-center justify-center gap-4 px-6 py-5 sm:gap-8">
                <span className="flex-1 text-right text-lg font-bold text-gray-900 sm:text-xl">
                    {firstName}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                    VS
                </span>
                <span className="flex-1 text-left text-lg font-bold text-gray-900 sm:text-xl">
                    {secondName}
                </span>
            </div>

            {/* apps / assists / goals */}
            <div className="grid grid-cols-3 gap-3 border-t border-gray-100 bg-gray-50/60 p-4 sm:gap-4 sm:p-6">
                {QUICK_STATS.map(field => {
                    const firstValue = firstPlayer[field.key];
                    const secondValue = secondPlayer[field.key];
                    const leader = getLeader(firstValue, secondValue, field.higherIsBetter);

                    return (
                        <div
                            key={field.key}
                            className="rounded-xl bg-white p-3 text-center shadow-sm ring-1 ring-gray-900/5 transition-shadow hover:shadow-md sm:p-4"
                        >
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 sm:text-xs">
                                {field.label}
                            </p>
                            <div className="mt-2 flex items-center justify-center gap-2 sm:gap-3">
                                <span className={`text-lg font-bold sm:text-2xl ${leader === "first" ? "text-emerald-600" : "text-gray-800"}`}>
                                    {formatValue(firstValue)}
                                </span>
                                <span className="text-gray-300">·</span>
                                <span className={`text-lg font-bold sm:text-2xl ${leader === "second" ? "text-emerald-600" : "text-gray-800"}`}>
                                    {formatValue(secondValue)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* minutes / minutes-per-goal / minutes-per-contribution */}
            <div className="divide-y divide-gray-100 border-t border-gray-100">
                {DETAIL_STATS.map(field => {
                    const firstValue = firstPlayer[field.key];
                    const secondValue = secondPlayer[field.key];
                    const leader = getLeader(firstValue, secondValue, field.higherIsBetter);

                    const total = (firstValue ?? 0) + (secondValue ?? 0);
                    const firstShare =
                        firstValue !== null && secondValue !== null && total > 0
                            ? (firstValue / total) * 100
                            : 50;

                    return (
                        <div key={field.key} className="px-6 py-4 sm:px-8 sm:py-5">
                            <div className="flex items-center justify-between gap-4">
                                <span className={`w-16 text-right text-base font-semibold sm:w-24 sm:text-lg ${leader === "first" ? "text-emerald-600" : "text-gray-800"}`}>
                                    {formatValue(firstValue)}
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 sm:text-sm">
                                    {field.label}
                                </span>
                                <span className={`w-16 text-left text-base font-semibold sm:w-24 sm:text-lg ${leader === "second" ? "text-emerald-600" : "text-gray-800"}`}>
                                    {formatValue(secondValue)}
                                </span>
                            </div>

                            {/* Proportional bar only for "more is more" stats like minutes —
                                for the two per-goal efficiency stats, a longer bar would
                                visually read as "bigger = better" even though lower is better
                                there, so we skip the bar and let the color do the talking. */}
                            {field.higherIsBetter && (
                                <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-gray-100">
                                    <div className="bg-emerald-500 transition-all duration-500" style={{ width: `${firstShare}%` }} />
                                    <div className="bg-gray-300 transition-all duration-500" style={{ width: `${100 - firstShare}%` }} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}