import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable} from 'rxjs'
import { environment } from 'src/environments/environment';

export interface PuntajeResponse{
  id: number,
  idUser: number,
  puntos: number,
  created_at: string
}

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  constructor(private httpClient: HttpClient) { }

  getPuntajes(idUser:number):Observable<PuntajeResponse[]>{
    return this.httpClient.get<PuntajeResponse[]>(`${environment.API_URL}/puntajes/${idUser}`)
  }
}
