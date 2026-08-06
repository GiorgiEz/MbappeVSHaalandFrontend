/* ===== GENERAL STATS ===== */
export interface GeneralStatsType {
    apps: number;
    goals: number;
    assists: number;
    minutes: number;
    minutes_per_goal: number | null;
    minutes_per_goal_contribution: number | null;
    details: DetailedStatsType;
}

export interface CompetitionType {
    [competition: string]: GeneralStatsType;
}

export interface CompetitionTiersType {
    [competition_tier: string]: {
        overall: GeneralStatsType;
        competitions: CompetitionType;
    };
}

export interface OverallCompetitionTiersType {
    overall: GeneralStatsType;
    competition_tiers: CompetitionTiersType;
}

/* ===== ALL-TIME STATS ===== */
export interface AgeType {
    [age: string]: OverallCompetitionTiersType;
}

export interface CareerType {
    [category: string]: GeneralStatsType;
}

export interface CompetitionsType {
    [team_type: string]: OverallCompetitionTiersType;
}

export interface FavouriteOpponentEntry {
    opponent: string;
    apps: number;
    goals: number;
    assists: number;
}

export interface FavouriteOpponentsType {
    club: FavouriteOpponentEntry[];
    country: FavouriteOpponentEntry[];
}

export interface FinalsType {
    Y: OverallCompetitionTiersType;
}

export interface SeasonsType {
    [season: string]: OverallCompetitionTiersType;
}

/* ===== CLUB STATS ===== */
export interface ClubsType {
    [team: string]: OverallCompetitionTiersType;
}

export interface ClubSeasonsType {
    [season: string]: OverallCompetitionTiersType;
}

/* ===== COUNTRY STATS ===== */
export interface YearsType {
    [year: string]: OverallCompetitionTiersType;
}

/* ===== HONOURS ===== */
export interface OverallBreakdown {
    category: string;
    count: number;
}

export interface TeamType {
    count: number;
    breakdown: OverallBreakdown[];
}

/**
 * team_trophies' overall: split into club vs. international,
 * each with its own category breakdown (e.g. club: League/Domestic
 * Cups/UCL/Others, international: World Cup/Euro/Nations League).
 */
export interface ClubInternationalOverallType {
    total: number;
    club: TeamType;
    international: TeamType;
}

/**
 * individual_awards' overall: a single flat category breakdown
 * (Golden Boot / Player of the Year / Other) — no club/international
 * split, since individual awards aren't scoped that way.
 */
export interface FlatOverallType {
    total: number;
    breakdown: OverallBreakdown[];
}

/** team_trophies and individual_awards use different overall shapes;
 * this covers both real cases from the generated JSON. */
export type OverallType = ClubInternationalOverallType | FlatOverallType;

export interface EntryType {
    [key: string]: string | number | boolean;
}

export interface BreakdownType {
    title: string;
    count: number;
    entries: EntryType[];
}

export interface HonourType {
    overall: OverallType;
    breakdown: BreakdownType[];
}

/** Per-player honours: what PlayerComparisonGate provides as
 * `mbappe` / `haaland` once it maps the raw JSON's player-name keys. */
export interface Honours {
    team_trophies: HonourType;
    individual_awards: HonourType;
}


/* ===== DETAILED STATS ===== */
export interface CountTotalType {
    count: number;
    total: number;
}

export interface DetailedStatsScoringType {
    goals_per_game: number;
    hat_tricks: number;
}

export interface DetailedStatsAppearancesType {
    games_started: CountTotalType;
    captain: CountTotalType;
    starting_percentage: number;
    captain_percentage: number;
}

export interface DetailedStatsPenaltiesType {
    scored: number;
    attempted: number;
    conversion_percentage: number | null;
    won: number;
}

export interface DetailedStatsShootingType {
    shots: number;
    shots_on_target: number;
    shots_on_target_percentage: number | null;
}

export interface DetailedStatsDisciplineType {
    yellow_cards: number;
    red_cards: number;
}

export interface DetailedStatsGeneralType {
    fouls_committed: number;
    fouls_drawn: number;
    offsides: number;
    crosses: number;
}

export interface DetailedStatsDefendingType {
    tackles_won: number;
    interceptions: number;
}

export interface DetailedStatsType {
    scoring: DetailedStatsScoringType;
    appearances: DetailedStatsAppearancesType;
    penalties: DetailedStatsPenaltiesType;
    shooting: DetailedStatsShootingType;
    discipline: DetailedStatsDisciplineType;
    general: DetailedStatsGeneralType;
    defending: DetailedStatsDefendingType;
}