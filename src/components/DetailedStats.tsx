import { useState } from "react";
import type { DetailedStatsType, DetailedStatsSectionFieldType, DetailedStatsSection} from "../utils/Types";
import {MBAPPE_COLOR, HAALAND_COLOR, MBAPPE_NAME, HAALAND_NAME, TITLE_COLOR} from "../utils/Constants";


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


export default function DetailedStats({player1, player2}: {player1: DetailedStatsType; player2: DetailedStatsType}) {
    const [open, setOpen] = useState(false);

    function renderValue (value: DetailedStatsSectionFieldType) {
        if (value == null) return "-";

        if (typeof value === "object" && "count" in value && "total" in value) {
            return `${value.count}/${value.total}`;
        }

        return value;
    }

    return (
        <div className={"flex justify-center"}>
            <button onClick={() => setOpen(true)} className="mt-3 mb-2 rounded-xl border px-5 py-3
            font-bold transition hover:scale-105 cursor-pointer" style={{color: TITLE_COLOR}}
            >
                Detailed Stats
            </button>

            {open && (
                <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    onClick={() => setOpen(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}
                        className="relative max-h-[90vh] w-full max-w-7xl overflow-y-auto rounded-2xl bg-gray-900 p-8 shadow-2xl"
                    >
                        {/* Close Button */}
                        <button onClick={() => setOpen(false)}
                            className="absolute right-5 top-5 flex h-6 w-8 items-center justify-center rounded-full
                            bg-gray-900 text-6xl text-gray-300 transition hover:text-white cursor-pointer"
                        >
                            ×
                        </button>

                        <h2 className="mb-8 text-center text-3xl font-bold text-white">Detailed Statistics</h2>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {SECTIONS.map((section) => {
                                return (
                                    <div key={section.title} className="rounded-xl border border-gray-700">
                                        <h3 className="border-b border-gray-700 py-3 text-center text-xl font-bold text-white">
                                            {section.title}
                                        </h3>

                                        <div className="grid grid-cols-3 border-b border-gray-700 py-2 text-center text-xl font-semibold">
                                            <div style={{ color: MBAPPE_COLOR }}>{MBAPPE_NAME}</div>
                                            <div className="text-gray-300">Statistic</div>
                                            <div style={{ color: HAALAND_COLOR }}>{HAALAND_NAME}</div>
                                        </div>

                                        {section.fields.map((field) => (
                                            <div key={field.label} className="grid grid-cols-3 border-b border-gray-800
                                                px-4 py-3 text-center last:border-none text-ms"
                                            >
                                                <div className="font-semibold" style={{ color: MBAPPE_COLOR }}>
                                                    {renderValue(field.getValue(player1))}
                                                </div>

                                                <div className="text-gray-300">{field.label}</div>

                                                <div className="font-semibold" style={{ color: HAALAND_COLOR }}>
                                                    {renderValue(field.getValue(player2))}
                                                </div>
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