import { Observable } from 'rxjs';
import { Pokemon } from './Pokemon';
import { ApiResponse } from './ApiResponse';

export type QueryParams = {
  pageSize: number;
  page: number;
}

export interface IPokemonService {
  getPokemons(queryParams: QueryParams): Observable<ApiResponse<Pokemon[]>>;
}
