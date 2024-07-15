import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { error } from 'console';
import { AppComponent } from '../app.component';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss'
})
export class EmployeeEditComponent {
  
  empForm: FormGroup;
  education: string[] = [
    'Matric',
    'Diploma',
    'Graduate',
    'Post Graduate',
  ];
  constructor(private _fb: FormBuilder,private _empservice : EmployeeService, private _dialogRef: MatDialogRef<EmployeeEditComponent>){
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  onFormSubmit(){
    if (this.empForm.valid){
      this._empservice.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert("Employee Added succesfully");
          this._dialogRef.close(true);
        },
        error: (err: any)=>{
          console.log(err)

        }
    });
    }

  }

}
