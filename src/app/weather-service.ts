import { Observable } from "../../node_modules/rxjs";
import { ICurrentWeather } from "./interfaces";

export interface IWeatherService {
    getCurrentWeather(search: string | number, country?: string): Observable<ICurrentWeather>;

}
