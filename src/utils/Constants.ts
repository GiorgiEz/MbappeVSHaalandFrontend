import type {GeneralStatsType, OverallCompetitionTiersType, DetailedStatsType} from "./Types.ts";

export const EMPTY_DETAILS_SECTION: DetailedStatsType = {
    scoring: {
        goals_per_game: 0,
        hat_tricks: 0,
    },
    appearances: {
        games_started: {
            count: 0,
            total: 0
        },
        starting_percentage: 0,
        captain: {
            count: 0,
            total: 0,
        },
        captain_percentage: 0
    },
    penalties: {
        scored: 0,
        attempted: 0,
        conversion_percentage: null,
        won: 0,
    },
    shooting: {
        shots: 0,
        shots_on_target: 0,
        shots_on_target_percentage: null,
    },
    discipline: {
        yellow_cards: 0,
        red_cards: 0,
    },
    general: {
        fouls_committed: 0,
        fouls_drawn: 0,
        offsides: 0,
        crosses: 0,
    },
    defending: {
        tackles_won: 0,
        interceptions: 0,
    },
};

export const EMPTY_STATS: GeneralStatsType = {
    apps: 0,
    goals: 0,
    assists: 0,
    minutes: 0,
    minutes_per_goal: null,
    minutes_per_goal_contribution: null,
    details: EMPTY_DETAILS_SECTION,
};

export const EMPTY_OVERALL_COMPETITION_TIERS: OverallCompetitionTiersType = {
    overall: EMPTY_STATS,
    competition_tiers: {},
}

export const MBAPPE_NAME = "Kylian Mbappe";
export const HAALAND_NAME = "Erling Haaland";

export const MBAPPE_COLOR = "#13afec"; // royal blue — France & Real Madrid
export const HAALAND_COLOR = "#D97706"; // amber/gold — his Dortmund breakout years
export const NOT_LEADING_COLOR = "#ffffff"; // gray
