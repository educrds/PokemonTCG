import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemonService, QueryParams } from '../interfaces/IPokemonService';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';
import { Pokemon } from '../interfaces/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService implements IPokemonService {
  constructor(private _http: HttpClient) {}

  /**
   * Metódo que faz uma chamada GET para obter cards de pokemon
   * @param queryParams parâmetro contendo page e pageSize enviado ao endpoint.
   * @returns um Observable que contém a resposta do tipo <ApiResponse<Pokemon[]>>.
   */
  getPokemons(queryParams: QueryParams): Observable<ApiResponse<Pokemon[]>> {
    const params = new HttpParams({ fromObject: queryParams });
    const cardsApiUrl = `${environment.apiUrl}/card`;

    return this._http
      .get<ApiResponse<Pokemon[]>>(cardsApiUrl, { params })
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
     * Manipula erros HTTP.
     * @returns Um Observable que lança uma mensagem de erro.
   */
  private handleError() {
    return throwError(() => new Error('Algo de errado aconteceu, tente novamente mais tarde.'));
  }
}
