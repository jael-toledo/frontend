import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { PuntajeResponse, PuntajeService } from '@app/pages/puntaje.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Userid: number = 0
  nombreUsuario:string=''
  emailUsuario:string=''
  institucion:string=''


  totalSimulaciones:number = 0
  puntajeMaximo:number=0

  codOculus: number = 0

  data: PuntajeResponse[] = []
  columnsToDisplay = ['puntos','created_at']
  constructor(public authSvc: AuthService, private ptjSvc: PuntajeService) { 
    this.ptjSvc.getPuntajes(authSvc.IDuser).subscribe(x =>{
      this.data = x
      console.log(this.data)
      this.totalSimulaciones = x.length
    })

    this.Userid = authSvc.IDuser
    this.nombreUsuario = authSvc.nombreUser
    this.emailUsuario = authSvc.emailUser
    this.institucion = authSvc.insUser
  }




  ngOnInit(): void {
  }

  obtenerCodOculus():void{
    this.authSvc.obtenerCodigoOculus(this.Userid).subscribe( x =>{
      this.codOculus = x.codigo
      console.log("codigo oculus:",this.codOculus)
    })
  }
}
