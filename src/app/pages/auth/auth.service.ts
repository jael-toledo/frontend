import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { User, UserResponse } from '@app/shared/models/user.interface';
import { Observable, catchError, throwError, map, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


const helper = new JwtHelperService()


export interface codigoInterface{
  codigo: number
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn = new BehaviorSubject<UserResponse|null>(null)

  private userId: number = 0
  private nombre: string=''
  private email: string =''
  private ins:string=''

  private estaLogeado:boolean=false

  constructor(private http:HttpClient, private router: Router) { 
    this.checkToken()
  }

  get isLogged$():Observable<UserResponse|null>{
    return this.loggedIn.asObservable()
  }

  get userValue(): UserResponse|null{
    return this.loggedIn.getValue();
    
  }

  get IDuser():number{
    return this.userId
  }

  get nombreUser():string{
    return this.nombre
  }

  get emailUser():string{
    return this.email
  }

  get insUser():string{
    return this.ins
  }

  get Logged():boolean{
    return this.estaLogeado
  }

  login(authData: User):Observable<UserResponse|void>{
    return this.http.post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
    .pipe(
      map((user:UserResponse) => {
        this.saveLocalStorage(user)
        this.loggedIn.next(user)
        console.log(user)
        this.userId = user.userId
        this.nombre = user.userName
        this.email = user.userEmail
        this.ins = user.userIns
        this.estaLogeado = true

        console.log(this.userId)
        console.log(this.nombre)
        console.log(this.email)
        console.log(this.ins)

        return user
      }), catchError((err)=> this.handlerError(err))
    );
  }


  logout():void{
    localStorage.removeItem('user')
    this.loggedIn.next(null)
    this.estaLogeado = false
    this.router.navigate(['/login'])
  }

  private checkToken():void{
    const userLocalStorage = String(localStorage.getItem('user'))

    const user = JSON.parse(userLocalStorage) || null;

    if (user) {
      const isExpired = helper.isTokenExpired(user.token);

      if (isExpired) {
        this.logout();
      } else {
        this.loggedIn.next(user);
      }
    }
  }

  private saveLocalStorage(user: UserResponse): void {
    const { message,userId, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  private handlerError(err: { message: any; }):Observable<never>{
    let errorMessage = 'Se produjo un error al recuperar los datos'
    if (err){
      errorMessage = `Error: code ${err.message}`
    }
    window.alert(errorMessage)
    return throwError(() => errorMessage)
  }

  obtenerCodigoOculus(id: number):Observable<codigoInterface>{
    return this.http.get<codigoInterface>(`${environment.API_URL}/users/linkoculus/${id}`)

  }
}
