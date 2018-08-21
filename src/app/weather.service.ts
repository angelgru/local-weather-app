import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { map } from 'rxjs/operators';
import { ICurrentWeather } from './interfaces';
import { environment } from './environments/environment';
import { IWeatherService } from './weather-service';

interface ICurrentWeatherData {
  weather: [{
    description: string,
    icon: string
  }],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  dt: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements IWeatherService{

  constructor(private httpClient: HttpClient) { }

  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
          `q=${city},${country}&appid=${environment.appId}`
      )
      .pipe(map(data => this.transformToICurrentWeather(data)))
  }

  transformToICurrentWeather (data: ICurrentWeatherData): ICurrentWeather {
    window.console.log('Weather service ' + data);
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image : `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: data.main.temp,
      description: data.weather[0].description
    };
  }
}
