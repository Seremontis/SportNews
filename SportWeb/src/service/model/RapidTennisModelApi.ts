export interface Tournament {
    id: string;
    name: string;
    city: string;
    country: string;
    surface: string;
    code: string;
    start_date: string;
    end_date: string;
    season: string;
}

export interface Match {
    id: string;
    status: string;
    title: string;
    home_id: string;
    home_player: string;
    away_id: string;
    away_player: string;
    date: string;
    court: string;
    round_id: string;
    round_name: string;
}

export interface HomeOrAway {
    first_name: string;
    last_name: string;
    full_name: string;
    country: string;
    ranking: string;
}

export interface Result {
    winner_id: string;
    result_description: string;
    home_sets: string;
    away_sets: string;
    home_set1: string;
    away_set1: string;
    home_set2: string;
    away_set2: string;
    home_set3: string;
    away_set3: string;
    home_set4: string;
    away_set4: string;
    home_set5: string;
    away_set5: string;
    home_tb1: string;
    away_tb1: string;
    home_tb2: string;
    away_tb2: string;
    home_tb3: string;
    away_tb3: string;
    home_tb4: string;
    away_tb4: string;
    home_tb5: string;
    away_tb5: string;
}

export interface Fields {
    tournament: Tournament;
    match: Match;
    home_or_away: HomeOrAway;
    result: Result;
}

export interface Meta {
    title: string;
    description: string;
    fields: Fields;
}

export interface Tournament2 {
    id: number;
    name: string;
    city: string;
    country: string;
    surface: string;
    code: string;
    start_date: string;
    end_date: string;
    season: number;
    country_code: any;
}

export interface Home {
    first_name: string;
    last_name: string;
    full_name: string;
    country: string;
    ranking: number;
}

export interface Away {
    first_name: string;
    last_name: string;
    full_name: string;
    country: string;
    ranking: number;
}

export interface Match2 {
    id: number;
    status: string;
    title: string;
    home_id: number;
    home_player: string;
    away_id: number;
    away_player: string;
    date: Date;
    court: string;
    round_id: number;
    round_name: string;
    home: Home;
    away: Away;
    result?: Result3;
}

export interface Result2 {
    tournament: Tournament2;
    matches: Match2[];
}

export interface RootObject {
    meta: Meta;
    results: Result2[];
}


export interface Result3 {
    home_sets: number;
    away_sets: number;
    home_set1: number;
    away_set1: number;
    home_set2: number;
    away_set2: number;
    home_set3: number;
    away_set3: number;
    home_set4: number;
    away_set4: number;
    home_set5: number;
    away_set5: number;
    home_tb1: number;
    away_tb1: number;
    home_tb2: number;
    away_tb2: number;
    home_tb3: number;
    away_tb3: number;
    home_tb4: number;
    away_tb4: number;
    home_tb5: number;
    away_tb5: number;
}
