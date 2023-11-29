import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true
    }
  ]
})
export class SelectFieldComponent {


  @Input() label: string = '';
  @Input() type: string = '';
  @Input() placeholder: string = '';
  @Input() errors: any;
  @Input() submitted: boolean = false;
  @Input() language: string[] = []
  public value?: string;
  public isDisabled?: boolean;
  public onChange = (_: any) => { }
  public onTouch = () => { }

  constructor() {

  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }


  onInput(value: any) {

  }

  onClick(value: string) {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }

}
