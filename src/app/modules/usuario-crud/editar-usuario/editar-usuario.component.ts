import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionActivaComponent } from 'src/app/components/confirmacion-activa/confirmacion-activa.component';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent {
  //Declaramos la coleccion de firebase, id, y el objeto en los que vamos a trabajar
  coleccion: string = 'Usuarios';
  documentId: string = '';
  usuario: any;
  rol: string = localStorage.getItem("rol")!;

  constructor(
    private firebase: UsuarioService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private _location: Location,
    private modalService: NgbModal,
    private router: Router
  ) {}

  formUsuario = this.fb.group({
    nombre: [],
    apellidos: [],
    contraseña: '',
    correo: [],
    telefono: [],
    mdDate: [],
    uuid: '',
    rol: [],
  });

  EditarDatos() {
    try {
      this.documentId = this.ruta.snapshot.paramMap.get('id')!;
      this.firebase
        .cogerUno(this.coleccion, this.documentId)
        .subscribe((resp: any) => {
          this.formUsuario.setValue(resp.payload.data());
        });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
  //Metodo para actualizar los datos del portero
  ActualizarDatos() {
    try {
      this.documentId = this.ruta.snapshot.paramMap.get('id')!;
      this.firebase.Actualizar(
        this.coleccion,
        this.documentId,
        this.formUsuario.value
      );
      // this._location.back();
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  Eliminar() {
    try {
      this.documentId = this.ruta.snapshot.paramMap.get('id')!;
      const modalRef = this.modalService.open(ConfirmacionActivaComponent);
      modalRef.componentInstance.documentId = this.documentId;
      modalRef.result
        .then((result) => {
          if (result === 'confirmar') {
            this.verificarRolYEliminar();
          }
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  verificarRolYEliminar() {
    this.firebase
      .cogerUno(this.coleccion, this.documentId)
      .subscribe((resp: any) => {
        this.usuario = resp.payload.data();
        if (this.usuario && this.usuario.rol === 3) {
          console.log('No se puede eliminar debido al rol del usuario.');
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
