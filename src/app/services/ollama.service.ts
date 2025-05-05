import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, of, retry} from 'rxjs';
import {OllamaResponseModel} from '../models/ollama-response.model';

@Injectable({
  providedIn: 'root'
})

export class OllamaService {
  private baseUrl = 'http://localhost:11434';
  private baseApiUrl = this.baseUrl +'/api';
  constructor(private http: HttpClient) { }

  isOllamaRunning() {
    return this.http.get(`${this.baseUrl}`, { observe: 'response', responseType: 'text' })
    .pipe(map((response: any) => {
      return response.ok;
    }),
    catchError(() => of(false)));
  }

  listModels() {
    return this.http.get<any>(`${this.baseApiUrl}/tags`);
  }

  generateResponse(model: string, prompt: string, max_tokens: number = 20) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      model: model,
      prompt: prompt,
      max_tokens: max_tokens,
      stream: false
    };
    return this.http.post<OllamaResponseModel>(`${this.baseApiUrl}/generate`, body,
      { headers }).pipe(map((data: OllamaResponseModel) => {
        if (data.response != ""){
          const match = data.response.match(/<think>([\s\S]*?)<\/think>/);
          const thinkResponse = match?.[1]?.trim() || '';
          const response = data.response.replace(/<think>[\s\S]*?<\/think>/, '').trim();
          data.thinkingResponse = thinkResponse;
          data.response = response;
          return data;
        }
        else{
          return data;
        }
    }));
  }
}
