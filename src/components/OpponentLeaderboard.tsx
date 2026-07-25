import type { OpponentStat } from "../Types.ts";

interface Props {
    playerName: string;
    color: string;
    opponents: OpponentStat[];
}

// Only the top 3 rows get a distinct ring color; everything below is plain gray.
const RANK_COLORS = ["#CA8A04", "#94A3B8", "#B45309"]; // gold, silver, bronze

export default function OpponentLeaderboard({ playerName, color, opponents }: Props) {
    const ranked = [...opponents].sort((a, b) => b.goals - a.goals || b.apps - a.apps);
    const maxGoals = ranked.length > 0 ? ranked[0].goals : 0;

    return (
        <div
            className="rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-900/5"
            style={{ borderTop: `4px solid ${color}` }}
        >
            <h2 className="border-b border-gray-100 p-6 text-center text-xl font-bold" style={{ color }}>
                {playerName}
            </h2>

            <div className="divide-y divide-gray-100">
                {ranked.map((opponent, index) => {
                    const rankColor = RANK_COLORS[index];
                    const barWidth = maxGoals > 0 ? (opponent.goals / maxGoals) * 100 : 0;

                    return (
                        <div key={opponent.opponent} className="flex items-center gap-4 px-6 py-4">
                            <span
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold"
                                style={{
                                    borderColor: rankColor ?? "#E5E7EB",
                                    color: rankColor ?? "#9CA3AF",
                                }}
                            >
                                {index + 1}
                            </span>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-baseline justify-between gap-2">
                                    <span className="truncate font-semibold text-gray-900">{opponent.opponent}</span>
                                    <span className="shrink-0 text-sm text-gray-400">
                                        {opponent.apps} apps · {opponent.assists} assists
                                    </span>
                                </div>
                                <div className="mt-1.5 flex items-center gap-2">
                                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{ width: `${barWidth}%`, backgroundColor: color }}
                                        />
                                    </div>
                                    <span className="w-6 shrink-0 text-right text-sm font-bold" style={{ color }}>
                                        {opponent.goals}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}