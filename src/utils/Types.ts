export interface GeneralStats {
    apps: number;
    goals: number;
    assists: number;
    minutes: number;
    minutes_per_goal: number | null;
    minutes_per_goal_contribution: number | null;
}

export interface OverallCompetitionStats {
    overall: GeneralStats;
    competitions: CompetitionStats;
}

export interface CompetitionStats {
    [competition: string]: GeneralStats;
}

export interface FavouriteOpponent {
    opponent: string;
    apps: number;
    goals: number;
    assists: number;
}

/* ===== ALL TIME STATS ===== */
// All Time Career
export type CareerJson = Record<string, Record<string, GeneralStats>>;

// All Time By Competition
export type CompetitionJson = Record<string, Record<string, OverallCompetitionStats>>;

// All Time By Age
export type AgeJson = Record<string, Record<string, GeneralStats>>;

// All Time Favourite Opponents
export type FavouriteOpponentsJson = Record<string, FavouriteOpponent[]>;

// All Time By Finals
export type FinalsJson = Record<string, OverallCompetitionStats>;

/* ===== CLUB STATS ===== */
// Club stats by clubs
export type PlayerClubGeneralStats = Record<string, Record<string, OverallCompetitionStats>>;

// Club stats by season
export type PlayerClubSeasonJson = Record<string, Record<string, OverallCompetitionStats>>;


/* ===== COUNTRY STATS ===== */
// Country stats by competition
export type CountryCompetitionJson = Record<string, OverallCompetitionStats>;

// Country stats by year
export type CountryYearJson = Record<string, Record<string, OverallCompetitionStats>>;


/* ===== HONOURS ===== */
export interface TrophyEntry {
    [key: string]: string | number | boolean;
}
export interface Trophy {
    title: string;
    count: number;
    entries: TrophyEntry[];
}

export interface OverallCategory {
    category: string;
    count: number;
}

export interface ClubOverall {
    count: number;
    breakdown: OverallCategory[];
}

export interface InternationalOverall {
    count: number;
}

export interface TeamTrophiesOverall {
    total: number;
    club: ClubOverall;
    international: InternationalOverall;
}

export interface IndividualAwardsOverall {
    total: number;
    breakdown: OverallCategory[];
}

export interface TeamTrophiesSection {
    overall: TeamTrophiesOverall;
    breakdown: Trophy[];
}

export interface IndividualAwardsSection {
    overall: IndividualAwardsOverall;
    breakdown: Trophy[];
}

/** Either honours section — Awards.tsx renders both through this union. */
export type HonoursSection = TeamTrophiesSection | IndividualAwardsSection;

export interface PlayerHonours {
    player: string;
    team_trophies: TeamTrophiesSection;
    individual_awards: IndividualAwardsSection;
}
export interface Honours {
    players: PlayerHonours[];
}