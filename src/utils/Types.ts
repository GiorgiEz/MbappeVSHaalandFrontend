export interface GeneralStats {
    apps: number;
    goals: number;
    assists: number;
    minutes: number;
    minutes_per_goal: number | null;
    minutes_per_goal_contribution: number | null;
}

export interface CareerStats {
    career: GeneralStats;
    club: GeneralStats;
    country: GeneralStats;
}

export type CareerJson = Record<string, CareerStats>;

export interface CompetitionStats {
    [competition: string]: GeneralStats;
}

export interface OverallCompetitionStats {
    total: GeneralStats;
    competitions: CompetitionStats;
}

export type CompetitionJson = Record<
    string,
    Record<string, OverallCompetitionStats>
>;

export interface FavouriteOpponent {
    opponent: string;
    apps: number;
    goals: number;
    assists: number;
}

export type FavouriteOpponentsJson = Record<
    string,
    FavouriteOpponent[]
>;

export interface FinalsStats {
    overall: GeneralStats;
    competitions: CompetitionStats;
}

export type FinalsJson = Record<
    string,
    FinalsStats
>;

export interface ClubStats {
    overall: GeneralStats;
    competitions: CompetitionStats;
}

export type ClubJson = Record<
    string,
    Record<string, ClubStats>
>;

export interface ClubSeasonStats {
    overall: GeneralStats;
    competitions: CompetitionStats;
}

export type ClubSeasonJson = Record<
    string,
    Record<string, Record<string, ClubSeasonStats>>
>;

export type CountryCompetitionJson = Record<
    string,
    OverallCompetitionStats
>;

export type CountryYearJson = Record<
    string,
    Record<string, OverallCompetitionStats>
>;

export interface TrophyEntry {
    [key: string]: string | number | boolean;
}

export interface Trophy {
    title: string;
    count: number;
    entries: TrophyEntry[];
}

export interface PlayerHonours {
    player: string;
    team_trophies: Trophy[];
    individual_awards: Trophy[];
}

export interface Honours {
    players: PlayerHonours[];
}

export interface ComparisonSection {
    title: string;
    first: GeneralStats;
    second: GeneralStats;
}

export type Player = "Kylian Mbappé" | "Erling Haaland";

export type TeamType = "club" | "country";

export type Result = "W" | "D" | "L";

export type CompetitionTier =
    | "Domestic League"
    | "Domestic Cup"
    | "Domestic Super Cup"
    | "Continental Club Cup"
    | "Club World Cup"
    | "Intercontinental Super Cup"
    | "International Tournament"
    | "International Qualifying"
    | "Friendly";
