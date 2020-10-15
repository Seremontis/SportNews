export interface Event {
    idEvent: string;
    idSoccerXML?: any;
    idAPIfootball: string;
    strEvent: string;
    strEventAlternate: string;
    strFilename: string;
    strSport: string;
    idLeague: string;
    strLeague: string;
    strSeason: string;
    strDescriptionEN?: any;
    strHomeTeam: string;
    strAwayTeam: string;
    intHomeScore?: any;
    intRound: string;
    intAwayScore?: any;
    intSpectators?: any;
    strOfficial: string;
    strHomeGoalDetails?: any;
    strHomeRedCards?: any;
    strHomeYellowCards?: any;
    strHomeLineupGoalkeeper?: any;
    strHomeLineupDefense?: any;
    strHomeLineupMidfield?: any;
    strHomeLineupForward?: any;
    strHomeLineupSubstitutes?: any;
    strHomeFormation?: any;
    strAwayRedCards?: any;
    strAwayYellowCards?: any;
    strAwayGoalDetails?: any;
    strAwayLineupGoalkeeper?: any;
    strAwayLineupDefense?: any;
    strAwayLineupMidfield?: any;
    strAwayLineupForward?: any;
    strAwayLineupSubstitutes?: any;
    strAwayFormation?: any;
    intHomeShots?: any;
    intAwayShots?: any;
    strTimestamp: Date;
    dateEvent: string;
    dateEventLocal?: any;
    strDate?: any;
    strTime: string;
    strTimeLocal?: any;
    strTVStation?: any;
    idHomeTeam: string;
    idAwayTeam: string;
    strResult?: any;
    strVenue: string;
    strCountry: string;
    strCity?: any;
    strPoster?: any;
    strFanart?: any;
    strThumb?: any;
    strBanner?: any;
    strMap?: any;
    strTweet1?: any;
    strTweet2?: any;
    strTweet3?: any;
    strVideo?: any;
    strStatus: string;
    strPostponed: string;
    strLocked: string;
}

export interface RootObject {
    events: Event[];
}



