import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IHttpResponseModal,
  IParamsDataSet,
} from '../interface/common.interface';

@Injectable({
  providedIn: 'root',
})
export class NewsHttpService {
  private readonly BASE_URL = 'https://newsapi.org/v2';
  private readonly http = inject(HttpClient);

  public getAlllNewsListing(
    filterData: IParamsDataSet
  ): Observable<IHttpResponseModal> {
    const params = new HttpParams()
      //set default as it is required to call API
      .set('q', filterData.searchValue ? filterData.searchValue : 'JavaScript')
      .set('from', filterData.from)
      .set('to', filterData.to);
    return this.http.get<IHttpResponseModal>(`${this.BASE_URL}/everything`, {
      params: params,
    });
  }

  // On Country Filter Change call this endpoint to filter the news Articles
  public getNewsByCountry(
    filterData: IParamsDataSet
  ): Observable<IHttpResponseModal> {
    const params = new HttpParams()
      .set('q', filterData.searchValue)
      .set('country', filterData.country);
    return this.http.get<IHttpResponseModal>(`${this.BASE_URL}/top-headlines`, {
      params: params,
    });
  }
}
