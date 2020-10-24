import { Timestamp } from 'rxjs';
import {ITokenData} from './ITokenData'
export interface IModelAuth {
    token:string;
    time: Date;
    userDetail: ITokenData;
}
