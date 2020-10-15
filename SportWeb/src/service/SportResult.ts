import { IModelResult } from './model/IModelResult'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { from } from 'rxjs';
import { Injectable } from '@angular/core';
import { RootObject as FootballApiModel } from 'src/service/model/ResultPageApiFootball'
import { RootObject as BasketballApiModel } from 'src/service/model/AllSportApiModel'
import { RootObject as TennisApi } from 'src/service/model/RapidTennisModelApi'
import { IModelKeyword } from './model/IModelKeyword';
@Injectable({
    providedIn: 'root'
})
export class SportResult {
    private basketballApi = ''
    readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            "x-rapidapi-host": "",
            "x-rapidapi-key": "",
        })
    };
    constructor(private http: HttpClient) {

    }

    async GetFootballResult(past: boolean = false): Promise<IModelResult[]> {
        let url
        if (past)
            url = 'https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4328';
        else
            url = 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328';

        let test = await this.http.get<FootballApiModel>(url).toPromise();
        let list: IModelResult[] = []
        console.log(test);
        test.events.forEach(elem => {
            let record: IModelResult = <IModelResult>{};
            record.dateMatach = new Date(elem.dateEvent);
            record.homeName = elem.strHomeTeam;
            record.awayName = elem.strAwayTeam;
            record.homeGoal = elem.intHomeScore;
            record.awayGoal = elem.intAwayScore;
            list.push(record);
        })
        return list;
    }

    async GetBasketballResult() {
        let endDate = new Date();
        let startDate=new Date();
        startDate.setDate(endDate.getDate()-14)
        let url = 'https://allsportsapi.com/api/basketball/?met=Fixtures&APIkey='+this.basketballApi+'&from='+this.formatDate(startDate)+'&to='+this.formatDate(endDate);

        let test = await this.http.get<BasketballApiModel>(url).toPromise();
        let list: IModelResult[] = []
        console.log(test);
        test.result.forEach(elem => {
            let record: IModelResult = <IModelResult>{};
            record.dateMatach = new Date(elem.event_date);
            record.homeName = elem.event_home_team;
            record.awayName = elem.event_away_team;
            let score=elem.event_final_result.split('-');
            record.homeGoal = score[0];
            record.awayGoal = score[1];
            list.push(record);
        })
        return list;
    }
    async GetTennislResult() {
        let date = new Date();
        let url = 'https://tennis-live-data.p.rapidapi.com/matches-by-date/'+this.formatDate(date);

        let test = await this.http.get<TennisApi>(url,this.httpOptions).toPromise();
        let list: IModelResult[] = []
        console.log(test);
        test.results.forEach(elem => {
            elem.matches.forEach(game=>{
                let record: IModelResult = <IModelResult>{};
                record.dateMatach = new Date(game.date);
                record.homeName = game.home_player;
                record.awayName = game.away_player;
                record.homeGoal = game.result.home_set1+' '+game.result.home_set2+' '+game.result.home_set3+' '+game.result.home_set4+' '+game.result.home_set5;
                record.awayGoal = game.result.away_set1+' '+game.result.away_set2+' '+game.result.away_set3+' '+game.result.away_set4+' '+game.result.away_set5;
                list.push(record);
            })
        })
        return list;
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
}
