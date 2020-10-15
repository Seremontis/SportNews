export interface HomeTeam {
    starting_lineups: any[];
    substitutes: any[];
    coaches: any[];
}

export interface AwayTeam {
    starting_lineups: any[];
    substitutes: any[];
    coaches: any[];
}

export interface Lineups {
    home_team: HomeTeam;
    away_team: AwayTeam;
}

export interface Result {
    event_key: string;
    event_date: string;
    event_time: string;
    event_home_team: string;
    home_team_key: string;
    event_away_team: string;
    away_team_key: string;
    event_final_result: string;
    event_quarter: string;
    event_status: string;
    country_name: string;
    league_name: string;
    league_key: string;
    league_round: string;
    league_season: string;
    event_live: string;
    event_home_team_logo: string;
    event_away_team_logo: string;
    lineups: Lineups;
}

export interface RootObject {
    success: number;
    result: Result[];
}



