import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { RegistroService } from '@app/pages/registro/registro.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private suscripcion: Subscription = new Subscription()

  registerForm: FormGroup = new FormGroup({
    nombrecompleto: new FormControl(null,[Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    pass:  new FormControl(null, [Validators.required]),
    institucion: new FormControl(null,[Validators.required]),
    tipousuario: new FormControl(null, [Validators.required])
  })

  allInstituciones = [
    "Pontificia Universidad Catolica",
    "Universidad de Santiago de Chile",
    "Universidad de Talca",
    "Universidad Tecnica Federico Santa Maria",
    "Universidad de Chile",
    "Universidad Tecnologica Metropolitana",
    "Universidad Adolfo Ibañez",
    "Universidad de Concepcion",
    "Univesidad de los Andes",
    "Universidad del Desarrollo",
    "Universidad Andres Bello"
  ]

  alltipousuario = [
    "admin",
    "Estudiante"
  ]
  /*
  nombrecompleto: string = "";
  email: string = "";
  pass: string = "";
  confirmPassword: string = "";*/

  /*
  register(){ 
    console.log(this.email)
    console.log(this.pass)
  }*/
  constructor(private regSvc: RegistroService,
    private fb: FormBuilder,
    private router: Router) 
    { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.suscripcion.unsubscribe()
  }

  register():void{
    const formValue = this.registerForm.value

    this.suscripcion.add(
      this.regSvc.new(formValue.nombrecompleto,formValue.email,formValue.pass,formValue.institucion,formValue.tipousuario).subscribe(res =>{
      if(res){
        this.router.navigate(['login'])
      }
    })
    )
  }
}
