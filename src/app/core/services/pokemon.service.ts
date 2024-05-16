import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemonService, QueryParams } from '../interfaces/IPokemonService';
import { environment } from '../../../environments/environment.development';
import { Observable, retry } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';
import { Pokemon } from '../interfaces/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService implements IPokemonService {
  constructor(private _http: HttpClient) {}

  /**
   * Metódo que faz uma chamada GET para obter cards de pokemon
   * @returns um Observable que contém a resposta do tipo <ApiResponse<Pokemon>>.
   */
  getPokemons(queryParams: QueryParams): Observable<ApiResponse<Pokemon[]>> {
    const params = new HttpParams({ fromObject: queryParams });

    return this._http
      .get<ApiResponse<Pokemon[]>>(`${environment.apiUrl}/cards`, { params })
      .pipe(retry(1));
  }
}
