import { useEffect, useState } from "react";

import type { DetailedStatsType, CountTotalType} from "../utils/Types";
import { MBAPPE_COLOR, HAALAND_COLOR } from "../utils/Constants";

interface Props {
    firstPlayer: DetailedStatsType;
    secondPlayer: DetailedStatsType;
    firstName?: string;
    secondName?: string;
}

type SectionConfig = {
    [K in keyof DetailedStatsType]: {
        key: K;
        title: string;
        fields: SectionField<K>[];
    }
}[keyof DetailedStatsType];


type SectionField<T extends keyof DetailedStatsType> = {
    key: keyof DetailedStatsType[T];
    label: string;
};

const SECTIONS: SectionConfig[] = [
    {
        key: "scoring",
        title: "Scoring",
        fields: [
            { key: "goals_per_game", label: "Goals / Game" },
            { key: "hat_tricks", label: "Hat-tricks" },
        ],
    },
    {
        key: "appearances",
        title: "Appearances",
        fields: [
            { key: "games_started", label: "Games Started" },
            { key: "starting_percentage", label: "Starting %" },
            { key: "captain", label: "Captain" },
            { key: "captain_percentage", label: "Captain %" },
        ],
    },
    {
        key: "penalties",
        title: "Penalties",
        fields: [
            { key: "scored", label: "Scored" },
            { key: "attempted", label: "Attempted" },
            { key: "conversion_percentage", label: "Conversion %" },
            { key: "won", label: "Won" },
        ],
    },
    {
        key: "shooting",
        title: "Shooting",
        fields: [
            { key: "shots", label: "Shots" },
            { key: "shots_on_target", label: "Shots on Target" },
            { key: "shots_on_target_percentage", label: "On Target %" },
        ],
    },
    {
        key: "discipline",
        title: "Discipline",
        fields: [
            { key: "yellow_cards", label: "Yellow Cards" },
            { key: "red_cards", label: "Red Cards" },
        ],
    },
    {
        key: "general",
        title: "General",
        fields: [
            { key: "fouls_committed", label: "Fouls Committed" },
            { key: "fouls_drawn", label: "Fouls Drawn" },
            { key: "offsides", label: "Offsides" },
            { key: "crosses", label: "Crosses" },
        ],
    },
    {
        key: "defending",
        title: "Defending",
        fields: [
            { key: "tackles_won", label: "Tackles Won" },
            { key: "interceptions", label: "Interceptions" },
        ],
    },
];

export default function DetailedStats({firstPlayer, secondPlayer, firstName = "Mbappé", secondName = "Haaland"}: Props) {
    const [open, setOpen] = useState(false);

    const renderValue = (value: string | CountTotalType) => {
        if (value == null) return "-";

        if (typeof value === "object" && "count" in value && "total" in value) {
            return `${value.count}/${value.total}`;
        }

        return value;
    };

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <div className={"flex justify-center"}>
            <button onClick={() => setOpen(true)}
                className="mt-3 mb-2 rounded-xl border border-gray-600 bg-gray-800 px-5 py-3 font-semibold text-white transition hover:bg-gray-700"
            >
                Show Detailed Statistics
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
                            bg-gray-900 text-6xl text-gray-300 transition hover:text-white"
                        >
                            ×
                        </button>

                        <h2 className="mb-8 text-center text-3xl font-bold text-white">Detailed Statistics</h2>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {SECTIONS.map((section) => {
                                const firstSection = firstPlayer[section.key];
                                const secondSection = secondPlayer[section.key];

                                return (
                                    <div key={section.title} className="rounded-xl border border-gray-700">
                                        <h3 className="border-b border-gray-700 py-3 text-center text-xl font-bold text-white">
                                            {section.title}
                                        </h3>

                                        <div className="grid grid-cols-3 border-b border-gray-700 py-2 text-center text-sm font-semibold">
                                            <div style={{ color: MBAPPE_COLOR }}>{firstName}</div>
                                            <div className="text-gray-300">Statistic</div>
                                            <div style={{ color: HAALAND_COLOR }}>{secondName}</div>
                                        </div>

                                        {section.fields.map((field) => (
                                            <div key={field.key} className="grid grid-cols-3 border-b border-gray-800
                                                px-4 py-3 text-center last:border-none"
                                            >
                                                <div className="font-semibold" style={{ color: MBAPPE_COLOR }}>
                                                    {renderValue(firstSection[field.key])}
                                                </div>

                                                <div className="text-gray-300">{field.label}</div>

                                                <div className="font-semibold" style={{ color: HAALAND_COLOR }}>
                                                    {renderValue(secondSection[field.key])}
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