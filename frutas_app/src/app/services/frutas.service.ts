//import { Axios } from './../../../node_modules/axios/index.d';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Axios, AxiosResponse } from 'axios';


interface Fruta {
  id_fruta: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class FrutasService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { } //private axios: Axios

  // Obtener todas las frutas
  getFrutas(): Observable<Fruta[]> {
    return this.http.get<Fruta[]>(`${this.apiUrl}get_frutas`);
  }

  // Obtener una fruta por id_fruta
  getFruta(id_fruta: number): Observable<Fruta> {
    return this.http.get<Fruta>(`${this.apiUrl}/${id_fruta}`);
  }

  // Crear una nueva fruta
  createFruta(fruta: Fruta): Observable<Fruta> {
    return this.http.post<Fruta>(`${this.apiUrl}create_fruta`, fruta);
  }

  // Actualizar una fruta existente
  updateFruta(id_fruta: number, fruta: Fruta): Observable<Fruta> {
    return this.http.put<Fruta>(`${this.apiUrl}update_fruta/${id_fruta}`, fruta);
  }

  // Eliminar una fruta
  deleteFruta(id_fruta: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}delete_fruta/${id_fruta}`,null);
  }

  /*
    getFrutas(): Observable<Fruta[]> {
      return from(this.axios.get(this.apiUrl)).pipe(
        map(response => response.data as Fruta[]),
        catchError((error) => {
          console.error('Error al obtener frutas:', error);
          return of([]); // Devuelve un arreglo vacío en caso de error
        })
      );
    }

    getFrutaByid_fruta(id_fruta: number): Observable<Fruta[]> {
      return from(this.axios.get(`${this.apiUrl}/${id_fruta}`)).pipe(
        map(response => response.data as Fruta[]),
        catchError((error) => {
          console.error('Error al obtener fruta por id_fruta:', error);
          return of([]); // Devuelve un arreglo vacío en caso de error
        })
      );
    }


    // Crear una nueva fruta
    createFruta(fruta: Fruta): Observable<Fruta[]> {
      return from(this.axios.post(`${this.apiUrl}`, fruta)).pipe(
        map(response => response.data as Fruta[]),
        catchError((error) => {
          console.error('Error al crear fruta por id_fruta:', error);
          return of([]); // Devuelve un arreglo vacío en caso de error
        })
      );
    }

    // Actualizar una fruta existente
    updateFruta(id_fruta: number, fruta: Fruta): Observable<Fruta> {
      return from(this.axios.put(`${this.apiUrl}/${id_fruta}`, fruta)).pipe(
        map(response => response.data as Fruta[]),
        catchError((error) => {
          console.error('Error al actualizar fruta por id_fruta:', error);
          return of([]); // Devuelve un arreglo vacío en caso de error
        })
      );
    }

    // Eliminar una fruta
    deleteFruta(id_fruta: number): Observable<void_fruta> {
      return this.http.delete<void_fruta>(`${this.apiUrl}/${id_fruta}`);
    }
  */
}
