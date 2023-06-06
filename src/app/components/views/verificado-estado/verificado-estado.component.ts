import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { Observable, map } from 'rxjs';
import { LoggerService } from 'src/app/services/logger/logger.service';
import 'firebase/compat/firestore';
import { format } from 'date-fns';

@Component({
  selector: 'app-verificado-estado',
  templateUrl: './verificado-estado.component.html',
  styleUrls: ['./verificado-estado.component.css'],
})
export class VerificadoEstadoComponent {
  constructor(private log: LoggerService, private router: Router, private afAuth: AngularFireAuth) { }
  emailVerified = false;
  estadoText: string = '';
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  AnadirAlLog(data: string) {
    console.log(data);
    try {
      this.log.AñadirLog().update({
        data: firebase.firestore.FieldValue.arrayUnion({
          dato: `[${this.fecha}]:${data}`
        }),
      });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
  checkEmailVerification() {
    const user = firebase.auth().currentUser;
    console.log(user);
    console.log(user!.emailVerified);
    if (user!.emailVerified == true) {
      this.router.navigate(['/Menu']);
    } else {
      this.router.navigate(['/verificado']);
      this.estadoText =
        'Vaya a su correo y compruebe que le haya llegado el correo, sino mire en spam';
    }
  }

  getEmailVerificationStatus(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user) => !!user && user.emailVerified)
    );
  }

  ngOnInit() {
     this.checkEmailVerification();
  }
}
