import type {HonourType, OverallType, OverallBreakdown, ClubInternationalOverallType, EntryType} from "../../utils/Types.ts";
import {HAALAND_NAME, MBAPPE_NAME, MBAPPE_COLOR, HAALAND_COLOR,} from "../../utils/Constants.ts";
import { hexToRgba } from "../../utils/helper_functions.ts";
import Title from "../../components/Title.tsx";


function formatEntry(entry: EntryType): string {
    const dateKey = "season" in entry ? "season" : "year" in entry ? "year" : null;
    const dateValue = dateKey ? String(entry[dateKey]) : null;
    const rest = Object.entries(entry)
        .filter(([key]) => key !== dateKey)
        .map(([, value]) => String(value));
    return [dateValue, ...rest].filter(Boolean).join(" · ");
}

/** Distinguishes team_trophies' overall (club/international split)
 * from individual_awards' overall (flat breakdown) so both render
 * through the same pill list. */
function isClubInternationalOverall(overall: OverallType): overall is ClubInternationalOverallType {
    return "club" in overall;
}

function getOverallCategories(overall: OverallType): OverallBreakdown[] {
    if (isClubInternationalOverall(overall)) {
        return [...overall.club.breakdown, ...overall.international.breakdown];
    }
    return overall.breakdown;
}

export default function Awards({title, trophies1, trophies2}: {title: string; trophies1: HonourType; trophies2: HonourType}){
    const players = [
        {playerName: MBAPPE_NAME, color: MBAPPE_COLOR, section: trophies1},
        {playerName: HAALAND_NAME, color: HAALAND_COLOR, section: trophies2},
    ];

    return (
        <div className="space-y-8">
            <Title title={title}/>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {players.map((player) => {
                    const { overall, breakdown } = player.section;
                    const categories = getOverallCategories(overall);

                    return (
                        <div key={player.playerName}
                            className="rounded-2xl border border-gray-100 bg-black shadow-lg shadow-gray-900/5"
                            style={{borderTop: `4px solid ${player.color}`}}
                        >
                            <h2 className="border-b border-gray-100 p-6 text-center text-xl font-bold"
                                style={{color: player.color}}
                            >
                                {player.playerName}
                            </h2>

                            {/* ===== Overall breakdown ===== */}
                            <div className="border-b border-gray-100 p-5">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-sm font-semibold uppercase tracking-wide" style={{color: player.color}}>
                                        Overall
                                    </span>
                                    <span
                                        className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold"
                                        style={{
                                            backgroundColor: hexToRgba(player.color, 0.12),
                                            color: player.color,
                                        }}
                                    >
                                        × {overall.total}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    {categories.map((cat) => (
                                        <div key={cat.category} className="rounded-xl p-3 text-center"
                                            style={{backgroundColor: hexToRgba(player.color, 0.08)}}
                                        >
                                            <div className="text-lg font-bold" style={{color: player.color}}>
                                                {cat.count}
                                            </div>
                                            <div className="text-xs text-white">{cat.category}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ===== Full breakdown (unchanged) ===== */}
                            <div className="divide-y divide-gray-100">
                                {breakdown.map((trophy) => (
                                    <div key={`${player.playerName}-${trophy.title}`} className="p-4 sm:p-5">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="font-semibold" style={{color: player.color}}>{trophy.title}</span>

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
                                                    <li key={index} className="text-sm text-white">
                                                        {formatEntry(entry)}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}