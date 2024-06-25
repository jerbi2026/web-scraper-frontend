import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrapService {
  private baseUrl = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) { }

  private postRequest(endpoint: string, body: any): Observable<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body, { headers });
  }

  scrapeDynamic(url: string, chose_a_extraire: string): Observable<any> {
    const endpoint = 'scrape/dynamic';
    const body = { url, chose_a_extraire };
    return this.postRequest(endpoint, body);
  }

  scrapeImdb(url: string): Observable<any> {
    const endpoint = 'scrape/imdb';
    const body = { url };
    return this.postRequest(endpoint, body);
  }

  scrapeKeyword(search_keyword: string, scroll_count: number = 0): Observable<any> {
    const endpoint = 'scrape/keyword';
    const body = { search_keyword, scroll_count };
    return this.postRequest(endpoint, body);
  }

  scrapeSimple(url: string, chose_a_extraire: string): Observable<any> {
    const endpoint = 'scrape/simple';
    const body = { url, chose_a_extraire };
    return this.postRequest(endpoint, body);
  }

  scrapeTradingview(url: string): Observable<any> {
    const endpoint = 'scrape/tradingview';
    const body = { url };
    return this.postRequest(endpoint, body);
  }

  downloadFile(): Observable<Blob> {
    const url = `${this.baseUrl}download/extracted_data.csv`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
