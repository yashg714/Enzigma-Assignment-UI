import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  isOpen = false;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.onClose.emit();
  }

  save() {
    // Perform save action
    this.isOpen = false;
    this.onSave.emit();
  }
}
