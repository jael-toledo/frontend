import { Injectable } from '@angular/core';
import { UserRegister } from '@app/shared/models/userRegister.interface';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }

  new(nombrecompleto: string, email:string, pass: string, institucion:string, tipousuario:string) {
    return this.http
      .post(`${environment.API_URL}/users`, {nombrecompleto,email,pass,institucion,tipousuario},{responseType:'text'})
      .pipe(catchError(this.handlerError))
  }

  handlerError(error:{message:any}):Observable<never> {
    let errorMessage = 'Error desconocido'
    if(error) {
      errorMessage = `Error ${error.message}`
    }
    window.alert(errorMessage)
    return throwError(() => errorMessage)
  }
}
