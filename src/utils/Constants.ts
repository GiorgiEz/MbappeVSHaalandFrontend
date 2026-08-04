import type {GeneralStatsType, OverallCompetitionTiersType} from "./Types.ts";

export const EMPTY_STATS: GeneralStatsType = {
    apps: 0,
    goals: 0,
    assists: 0,
    minutes: 0,
    minutes_per_goal: null,
    minutes_per_goal_contribution: null,
};

export const EMPTY_OVERALL_COMPETITION_TIERS: OverallCompetitionTiersType = {
    overall: EMPTY_STATS,
    competition_tiers: {},
}

export const MBAPPE_NAME = "Kylian Mbappe";
export const HAALAND_NAME = "Erling Haaland";

export const MBAPPE_COLOR = "#1D4ED8"; // royal blue — France & Real Madrid
export const HAALAND_COLOR = "#D97706"; // amber/gold — his Dortmund breakout years
export const NOT_LEADING_COLOR = "#c7bcbc"; // gray
export const TITLE_COLOR = "#e6c4da";
