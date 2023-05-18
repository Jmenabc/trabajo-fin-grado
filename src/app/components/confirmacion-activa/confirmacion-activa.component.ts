import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmacion-activa',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirmación de eliminación</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss()"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Escribe "{{ documentId }}" para confirmar la eliminación:</p>
      <input
        type="text"
        class="form-control"
        [(ngModel)]="confirmacion"
        (keyup.enter)="confirmar()"
      />
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        (click)="activeModal.dismiss()"
      >
        Cancelar
      </button>
      <button type="button" class="btn btn-danger" (click)="confirmar()">
        Confirmar
      </button>
    </div>
  `,
})
export class ConfirmacionActivaComponent {
  @Input() documentId?: string;
  confirmacion: string = '';
  constructor(public activeModal: NgbActiveModal) {}

  confirmar() {
    if (
      this.confirmacion
    ) {
      this.activeModal.close('confirmar');
    } else {
      this.activeModal.dismiss('cancelar');
    }
  }
}
