import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeService } from './services/employee.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','company', 'experience', 'package', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  
  constructor(private _dialog: MatDialog,
    private _empService: EmployeeService){}

    


  ngOnInit(): void {
    this.getEmployeeList();
  }
    openAddEditEmployee(){
      const DialogRef=  this._dialog.open(
        EmployeeEditComponent

      );
      DialogRef.afterClosed().subscribe({
        next: (val)=> {
          if(val){
            this.getEmployeeList();

          }
        }
      })

    }


    getEmployeeList(){
      this._empService.getEmployeeList().subscribe({
        next: (res)=> {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort= this.sort;
          this.dataSource.paginator = this.paginator;
        }, 
        error: (err)=>{
          console.log(err);
        }
      })
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    deleteEmployee(id:number){
      this._empService.deleteEmployee(id).subscribe({
        next: (res)=>{
          alert("Employee is deleted!")
          this.getEmployeeList();
        },
        error: console.log,
        
      }
      )

    }


    openEditForm(data: any ){
     const DialogRef= this._dialog.open(EmployeeEditComponent,{
      data,
     });

     DialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
     })

    }



  
}
