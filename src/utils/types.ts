export type StatsType = {
    goals: string;
    assists: string;
    games_played: string;
    total_minutes: string;
    minutes_per_goal: string;
    minutes_per_goal_contribution: string;
};

export type CompetitionStatsType = {
    [competition: string]: StatsType;
};

export type ClubStatsType = {
    all_time: StatsType;
    by_competition: CompetitionStatsType;
};

export type ClubAllTimeStatsType = {
    all_time: StatsType;
    by_club: {
        [team: string]: ClubStatsType;
    };
};

export type CountryAllTimeStatsType = {
    all_time: StatsType;
    by_competition: CompetitionStatsType;
};

export type PlayerStatsType = {
    all_time: StatsType;
    club_all_time: ClubAllTimeStatsType;
    country_all_time: CountryAllTimeStatsType;
};

export type AllTimeStatsType = {
    [player: string]: PlayerStatsType;
};