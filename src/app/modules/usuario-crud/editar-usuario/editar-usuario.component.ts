import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionActivaComponent } from 'src/app/components/confirmacion-activa/confirmacion-activa.component';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
/*
  Clase que contiene los metodos de edicion y eliminacion
  @author Jmenabc
*/
export class EditarUsuarioComponent {
  //Declaramos la coleccion de firebase, id, y el objeto en los que vamos a trabajar
  coleccion: string = 'Usuarios';
  documentId: string = '';
  usuario: any;
  rol: string = localStorage.getItem('rol')!;
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  constructor(
    private firebase: UsuarioService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private _location: Location,
    private modalService: NgbModal,
    private router: Router,
    private log: LoggerService,
    private afAuth: AngularFireAuth
  ) { }

  formUsuario = this.fb.group({
    nombre: [],
    apellidos: [],
    correo: [],
    telefono: [],
    mdDate: [],
    uuid: '',
    rol: [],
  });
  //Metodo ir para la ventana de atras
  irAtras() {
    this._location.back();
  }
  //Metodo que añade al log
  AnadirAlLog(data: string) {
    try {
      this.log.AñadirLog().update({
        data: firebase.firestore.FieldValue.arrayUnion({
          dato: `[${this.fecha}]:${data}`
        }),
      });
    } catch (error) {
      this.AnadirAlLog('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
  //Metodo que carga los datos
  EditarDatos() {
    try {
      this.AnadirAlLog('Cargando los datos');
      this.documentId = this.ruta.snapshot.paramMap.get('id')!;
      this.firebase
        .cogerUno(this.coleccion, this.documentId)
        .subscribe((resp: any) => {
          this.formUsuario.setValue(resp.payload.data());
        });
      this.AnadirAlLog('Datos cargados correctamente')
    } catch (error) {
      this.AnadirAlLog('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
  //Metodo para actualizar los datos del portero
  ActualizarDatos() {
    try {
      this.documentId = this.ruta.snapshot.paramMap.get('id')!;
      this.AnadirAlLog('Actualizando usuario')
      this.firebase.Actualizar(
        this.coleccion,
        this.documentId,
        this.formUsuario.value
      );
      this._location.back();
      this.AnadirAlLog('Usuario actualizado')
    } catch (error) {
      this.AnadirAlLog('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
  //Metodo para eliminar usuarios
  Eliminar() {
    try {
      const user = this.afAuth.currentUser;
      this.documentId = this.ruta.snapshot.paramMap.get('id')!;
      this.AnadirAlLog(`Eliminando usuario ${this.documentId}`)
      const modalRef = this.modalService.open(ConfirmacionActivaComponent);
      modalRef.componentInstance.documentId = this.documentId;
      modalRef.result
        .then((result) => {
          if (result === 'confirmar') {
            this.verificarRolYEliminar();
            this.AnadirAlLog(`Usuario ${this.documentId} eliminado con exito`)
          }
          this.AnadirAlLog(`Se cancelo la eliminacion de ${this.documentId}`)
        })
        .catch((error) => {
          this.AnadirAlLog(error);
        });
    } catch (error) {
      this.AnadirAlLog('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
  //metodo que nos verifica el rol del usuario
  verificarRolYEliminar() {
    this.AnadirAlLog('Verificando rol');
    this.firebase
      .cogerUno(this.coleccion, this.documentId)
      .subscribe((resp: any) => {
        this.usuario = resp.payload.data();
        if (this.usuario && this.usuario.rol === 3) {
          this.AnadirAlLog('No se puede eliminar debido al rol del usuario.');
        } else {

          this.firebase.Eliminar(this.coleccion, this.documentId);
          this._location.back();
        }
      });
  }

  ngOnInit() {
    this.EditarDatos();
  }
}
