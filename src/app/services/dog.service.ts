import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  
  private apiUrl: string = 'https://dog.ceo/api';
  gotAllBreedsflag = false;
  breedNames: string[] = [];
  constructor(private http: HttpClient) { }

  getAllBreeds(): Observable<any>{
    let API_URL = `${this.apiUrl}/breeds/list/all`;
    return this.http.get(API_URL);
  }
  
  getBreedImage(breed: string, count=1): Observable<any>{
    let API_URL = `${this.apiUrl}/breed/${breed}/images/random/${count}`;
    return this.http.get(API_URL);
  }

}
