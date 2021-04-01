import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
declare var jQuery:any;

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
  employeesList: any;
  isLoading = true;
  addEmployee: FormGroup;
  updateEmployee: FormGroup;
  currentId: any;
  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
    public toast: ToastrService
  ) { }

  ngOnInit() {
    this.initialize();
    this.getEmployees();
  }
  getEmployees() {
    this.api.get('getEmployees', {}).subscribe(data => {
      this.isLoading = false;
      this.employeesList = data.employees;
    });
  }
  initialize() {
    this.addEmployee =  new FormGroup({
      f_name: new FormControl('', [Validators.required]),
      l_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      designation: new FormControl(''),
      phone: new FormControl('', [Validators.required,Validators.pattern(("[0-9]\\d{9}"))]),
      user_type: new FormControl(''),
    });
    this.addEmployee.patchValue({
      user_type: 'employee'
    });
    this.updateEmployee =  new FormGroup({
      f_name: new FormControl('', [Validators.required]),
      l_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      designation: new FormControl(''),
      phone: new FormControl('', [Validators.required,Validators.pattern(("[0-9]\\d{9}"))]),
      id: new FormControl(''),
    });
  }
  getEmployeesById(id) {
    this.currentId = id;
    this.spinner.show();
    this.api.get('getUserById/' + id, {}).subscribe(data => {
      this.spinner.hide();
      if (data) {
        this.updateEmployee.patchValue({
          f_name: data.subAdmins.f_name,
          l_name: data.subAdmins.l_name,
          email: data.subAdmins.email,
          designation: data.subAdmins.role,
          phone: data.subAdmins.phone,
          password: data.subAdmins.password,
          id: id
        })
      }
    });
  }
  addEmployees() {
    this.spinner.show();
    jQuery("#addEmployeeModal").modal("hide");
    this.api.post('registerEmployee', this.addEmployee.value).subscribe((data) => {
      if (data.Error) {
        this.spinner.hide();
        this.toast.warning(data.msg,'' ,{
          timeOut: 1000
        });
      } else {
        this.toast.success(data.msg,'' ,{
          timeOut: 1000
        });
        this.toast.success('Email sent to user upto 5 mins','' ,{
          timeOut: 1000
        });
        this.spinner.hide();
        this.getEmployees();
      }
    })
  }
  updateEmployees() {
    jQuery("#updateEmployeeModal").modal("hide");

    this.api.post('EditUser', this.updateEmployee.value).subscribe((data) => {
      if (data.Error) {
        this.toast.warning(data.msg,'' ,{
          timeOut: 1000
        });
      } else {
        this.toast.success(data.msg,'' ,{
          timeOut: 1000
        });
        this.getEmployees();
      }
    })
  }
  setId(id) {
    this.currentId = id;
  }
  delete() {
    jQuery("#delModal").modal("hide");
    this.api.get('delUserById/' + this.currentId).subscribe((data) => {
      if (!data.Error) {
        this.toast.success(data.msg,'' ,{
          timeOut: 1000
        });
        this.getEmployees();
      }
    })
  }
}
