import { useState } from "react";
import type { GeneralStatsType, ClubsType } from "../../utils/Types.ts";
import { JSON_URLS } from "../../api/jsonUrls.ts";
import {MBAPPE_COLOR, HAALAND_COLOR, MBAPPE_NAME, HAALAND_NAME} from "../../utils/Constants.ts";
import { formatValue, hexToRgba } from "../../utils/helper_functions.ts";
import PlayerComparisonGate from "../../components/PlayerComparisonGate.tsx";
import Title from "../../components/Title.tsx";


const QUICK_FIELDS: { key: keyof GeneralStatsType; label: string }[] = [
    { key: "apps", label: "Appearances" },
    { key: "goals", label: "Goals" },
    { key: "assists", label: "Assists" },
];

const DETAIL_FIELDS: { key: keyof GeneralStatsType; label: string }[] = [
    { key: "minutes", label: "Minutes" },
    { key: "minutes_per_goal", label: "Minutes / Goal" },
    { key: "minutes_per_goal_contribution", label: "Minutes / Contribution" },
];


function ClubPanel({playerName, color, clubs,}: { playerName: string; color: string; clubs: ClubsType; }) {
    const clubNames = Object.keys(clubs);
    const [selectedClub, setSelectedClub] = useState(clubNames[2] ?? clubNames[0]);
    const clubData = clubs[selectedClub];

    if (!clubData) {
        return (
            <div className="rounded-2xl border border-gray-100 bg-black shadow-lg">
                <p className="p-6 text-center text-gray-200">No data available.</p>
            </div>
        );
    }

    return (
        <div
            className="rounded-2xl border border-white bg-black shadow-lg shadow-gray-900/5"
            style={{ borderTop: `4px solid ${color}` }}
        >
            {/* Header */}
            <div className="border-b border-white p-6 text-center">
                <h2 className="text-xl font-bold" style={{ color }}>{playerName}</h2>
                <p className="mt-1 text-sm text-white">{selectedClub}</p>
            </div>

            {/* Club selector */}
            <div className="flex flex-wrap justify-center gap-2 border-b border-white p-4">
                {clubNames.map((club) => {
                    const active = club === selectedClub;

                    return (
                        <button key={club} onClick={() => setSelectedClub(club)}
                            className="rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors hover:cursor-pointer"
                            style={active ? {backgroundColor: color, color: "#fff"} :
                                {backgroundColor: hexToRgba(color, 0.08), color}
                            }
                        >
                            {club}
                        </button>
                    );
                })}
            </div>

            {/* Overall stats */}
            <div className="grid grid-cols-3 gap-3 bg-gray-50/60 p-4 sm:gap-4 sm:p-6">
                {QUICK_FIELDS.map((field) => (
                    <div key={field.key}
                        className="rounded-xl bg-black p-3 text-center shadow-sm ring-1 ring-gray-900/5"
                    >
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-white">
                            {field.label}
                        </p>

                        <p className="mt-2 text-lg font-bold" style={{color}}>{formatValue(clubData.overall[field.key])}</p>
                    </div>
                ))}
            </div>

            <div className="divide-y divide-gray-100 border-t">
                {DETAIL_FIELDS.map((field) => (
                    <div key={field.key} className="flex items-center justify-between px-6 py-3">
                        <span className="text-xs font-semibold uppercase tracking-wide text-white">
                            {field.label}
                        </span>

                        <span className="text-base font-bold text-white">{formatValue(clubData.overall[field.key])}</span>
                    </div>
                ))}
            </div>

            {/* Competition tiers */}
            <div className="border-t border-gray-100 p-5 space-y-6">
                {Object.entries(clubData.competition_tiers).map(
                    ([tierName, tier]) => (
                        <div key={tierName} className="rounded-xl border border-gray-100 overflow-hidden">
                            {/* Tier header */}
                            <div className="px-4 py-3" style={{backgroundColor: hexToRgba(color, 0.08)}}>
                                <h3 className="font-bold" style={{ color }}>
                                    {tierName}{Object.keys(tier.competitions).length === 1 &&
                                        ` - ${Object.keys(tier.competitions)[0]}`}
                                </h3>

                                <div className="mt-2 text-sm text-white">
                                    {formatValue(tier.overall.apps)} apps ·{" "}
                                    {formatValue(tier.overall.goals)} goals ·{" "}
                                    {formatValue(tier.overall.assists)} assists
                                </div>
                            </div>

                            {/* Competitions */}
                            {Object.entries(tier.competitions).length > 1 &&
                                <div className="divide-y divide-white">
                                    {Object.entries(tier.competitions).map(([competition, stats]) => (
                                        <div key={competition} className="flex items-center justify-between px-4 py-3">
                                            <span className="text-sm text-white">{competition}</span>

                                            <span className="text-xs text-white">
                                                {formatValue(stats.apps)} apps ·{" "}
                                                {formatValue(stats.goals)} G ·{" "}
                                                {formatValue(stats.assists)} A
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    )
                )}
            </div>
        </div>
    );
}


export default function Clubs() {
    return (
        <PlayerComparisonGate<ClubsType> queryKey="clubs" url={JSON_URLS.club.clubs}>
            {({ mbappe, haaland }) => (
                <div className="space-y-8">
                    <Title title="Record by Club" />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <ClubPanel
                            playerName={MBAPPE_NAME}
                            color={MBAPPE_COLOR}
                            clubs={mbappe}
                        />

                        <ClubPanel
                            playerName={HAALAND_NAME}
                            color={HAALAND_COLOR}
                            clubs={haaland}
                        />
                    </div>
                </div>
            )}
        </PlayerComparisonGate>
    );
}