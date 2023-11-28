import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent {

  @Input() fieldValue: string = '';
  @Input() control: any;
  @Input() formControlName: string = '';
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() errors: any[] = [];
  @Input() value: string = '';
  @Output() fieldValueChange = new EventEmitter<string>();


  constructor() { }

  onValueChange(value: string) {
    this.fieldValue = value;
    this.fieldValueChange.emit(this.fieldValue);
  }


}
