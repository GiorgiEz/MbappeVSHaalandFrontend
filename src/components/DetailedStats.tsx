import { useState } from "react";
import type { DetailedStatsType, DetailedStatsSectionFieldType, DetailedStatsSection} from "../utils/Types";
import {MBAPPE_COLOR, HAALAND_COLOR, MBAPPE_NAME, HAALAND_NAME} from "../utils/Constants";


/** SECTIONS should match the exact structure as it is provided in JSON file */
const SECTIONS: DetailedStatsSection[] = [
    {
        title: "Scoring",
        fields: [
            { label: "Goals / Game", getValue: (s) => s.scoring.goals_per_game },
            { label: "Hat-tricks", getValue: (s) => s.scoring.hat_tricks },
        ],
    },
    {
        title: "Appearances",
        fields: [
            { label: "Games Started", getValue: (s) => s.appearances.games_started },
            { label: "Starting %", getValue: (s) => s.appearances.starting_percentage },
            { label: "Captain", getValue: (s) => s.appearances.captain },
            { label: "Captain %", getValue: (s) => s.appearances.captain_percentage },
        ],
    },
    {
        title: "Penalties",
        fields: [
            { label: "Scored", getValue: (s) => s.penalties.scored },
            { label: "Attempted", getValue: (s) => s.penalties.attempted },
            { label: "Conversion %", getValue: (s) => s.penalties.conversion_percentage },
            { label: "Won", getValue: (s) => s.penalties.won },
        ],
    },
    {
        title: "Shooting",
        fields: [
            { label: "Shots", getValue: (s) => s.shooting.shots },
            { label: "Shots on Target", getValue: (s) => s.shooting.shots_on_target },
            { label: "On Target %", getValue: (s) => s.shooting.shots_on_target_percentage },
        ],
    },
    {
        title: "Discipline",
        fields: [
            { label: "Yellow Cards", getValue: (s) => s.discipline.yellow_cards },
            { label: "Red Cards", getValue: (s) => s.discipline.red_cards },
        ],
    },
    {
        title: "General",
        fields: [
            { label: "Fouls Committed", getValue: (s) => s.general.fouls_committed },
            { label: "Fouls Drawn", getValue: (s) => s.general.fouls_drawn },
            { label: "Offsides", getValue: (s) => s.general.offsides },
            { label: "Crosses", getValue: (s) => s.general.crosses },
        ],
    },
    {
        title: "Defending",
        fields: [
            { label: "Tackles Won", getValue: (s) => s.defending.tackles_won },
            { label: "Interceptions", getValue: (s) => s.defending.interceptions },
        ],
    },
];


export default function DetailedStats({player1, player2, player1Name = MBAPPE_NAME, player1Color = MBAPPE_COLOR,
                                          player2Name = HAALAND_NAME, player2Color = HAALAND_COLOR, buttonLabel = "Detailed Stats", compact = false}: {
    player1: DetailedStatsType; player2?: DetailedStatsType | null; player1Name?: string;
    player1Color?: string; player2Name?: string; player2Color?: string; buttonLabel?: string; compact?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const hasPlayer2 = player2 != null;
    const gridColsClass = hasPlayer2 ? "grid-cols-3" : "grid-cols-2";

    function renderValue (value: DetailedStatsSectionFieldType) {
        if (value == null) return "-";

        if (typeof value === "object" && "count" in value && "total" in value) {
            return `${value.count}/${value.total}`;
        }

        return value;
    }

    return (
        <div className={"flex justify-center"}>
            <button onClick={() => setOpen(true)}
                    className={
                        compact
                            ? "rounded-lg border px-3 py-1 text-xs font-semibold transition hover:scale-105 cursor-pointer "
                            : "mt-3 mb-2 rounded-xl border px-5 py-3 font-bold transition hover:scale-105 cursor-pointer"
                    }
                    style={{color: "#ffffff"}}
            >
                {buttonLabel}
            </button>

            {open && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                     onClick={() => setOpen(false)}
                >
                    {/* Modal Container: Added border-2 border-white, changed max-w-6xl to max-w-3xl, adjusted padding */}
                    <div onClick={(e) => e.stopPropagation()}
                         className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border-2 border-white bg-black p-4 md:p-5 shadow-2xl"
                    >
                        {/* Close Button: Scaled down positioning and text size to fit the new proportions */}
                        <button onClick={() => setOpen(false)}
                                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full
                        bg-gray-900 text-3xl pb-1 text-gray-300 transition hover:text-white cursor-pointer"
                        >
                            ×
                        </button>

                        {/* Title: Scaled down font and margin */}
                        <h2 className="mb-4 text-center text-2xl font-bold text-white">Detailed Statistics</h2>

                        {/* Grid: Reduced gap from gap-6 to gap-4 */}
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            {SECTIONS.map((section) => {
                                return (
                                    <div key={section.title} className="rounded-xl border border-gray-700">
                                        {/* Section Title: Adjusted padding and text size */}
                                        <h3 className="border-b border-gray-700 py-2 text-center text-lg font-bold text-white">
                                            {section.title}
                                        </h3>

                                        {/* Column Headers: Adjusted padding and text size */}
                                        <div className={`grid ${gridColsClass} border-b border-gray-700 py-1.5 text-center text-base font-semibold`}>
                                            <div style={{ color: player1Color }}>{player1Name}</div>
                                            <div className="text-gray-300">Statistic</div>
                                            {hasPlayer2 && <div style={{ color: player2Color }}>{player2Name}</div>}
                                        </div>

                                        {/* Rows: Reduced padding and corrected text-ms to text-sm */}
                                        {section.fields.map((field) => (
                                            <div key={field.label} className={`grid ${gridColsClass} border-b border-gray-800
                                            px-2 py-1.5 text-center last:border-none text-sm`}
                                            >
                                                <div className="font-semibold" style={{ color: player1Color }}>
                                                    {renderValue(field.getValue(player1))}
                                                </div>

                                                <div className="text-gray-300">{field.label}</div>

                                                {hasPlayer2 && (
                                                    <div className="font-semibold" style={{ color: player2Color }}>
                                                        {renderValue(field.getValue(player2!))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}