import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  // Service to get data
  getWords(word: string) {
    const _headers = new HttpHeaders();
    const headers: HttpHeaders = _headers
      .append('Accept', 'application/json')
      .append('app_id', 'cb35ef20')
      .append('app_key', '603be016c344650e6d8c1da15330f7af');
    return this.http.get(`/api/search/en?q=${word}&prefix=false&limit=10`, {
      headers
    });
  }
  // Service to get full data
  getDefinition(word: string) {
    const _headers = new HttpHeaders();
    const headers: HttpHeaders = _headers
      .append('Accept', 'application/json')
      .append('app_id', 'cb35ef20')
      .append('app_key', '603be016c344650e6d8c1da15330f7af');
    return this.http.get(`/api/entries/en/${word}`, { headers });
  }
  // Service to get synonyms and antonyms
  getSynAnt(word: string) {
    const _headers = new HttpHeaders();
    const headers: HttpHeaders = _headers
      .append('Accept', 'application/json')
      .append('app_id', 'cb35ef20')
      .append('app_key', '603be016c344650e6d8c1da15330f7af');
    return this.http.get(`/api/entries/en/${word}/synonyms;antonyms`, {
      headers
    });
  }
}
