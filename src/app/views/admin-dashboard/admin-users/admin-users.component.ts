import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service';
import User from '../../../models/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  roleForm: FormGroup = new FormGroup({
    role: new FormControl('', Validators.required)
  });

  roles: any[] = [
    {
      role: "ADMIN_ROLE",
      name: "Administrador"
    },
    {
      role: "CLIENT_ROLE",
      name: "Cliente"
    }
  ]

  token: any = '';
  users: any;
  actualPage: number = 1;
  submitted = false;
  userRole: string;

  constructor(public auth: AuthService, public adminService: AdminService) { }

  ngOnInit() {
  	this.token = this.auth.loadSession();
    this.showUsers(this.token);
  }

  async onSubmit(id: string){
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertirlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    });

    if(result.value) {
      Swal.fire("Procesando...");
      Swal.showLoading();
      this.submitted = true;
      const user = new User(
        null,
        null,
        null,
        null,
        null,
        null,
        this.roleForm.get('role').value as string,
        null,
        null,
        null,
        null
      );

      try {
        const updatedRole = await this.adminService.updateUser(id, user, this.token).catch(err => {
          throw err;
        });
        this.submitted = false;
        Swal.fire(
          'Usuario actualizado',
          'El rol del usuario ha sido actualizado',
          'success'
        )
      } catch (err) {
        this.submitted = false;
        Swal.fire({
          title: "Error",
          icon: "error",
          html:
            "Ha ocurrido un error al tratar de actualizar el usuario. Intente de nuevo"
        });
        console.log(err);
      }
    }
  }

  async showUsers(token: string) {
    try {
      this.users = await this.adminService.getUsers(token).catch(err => {
        throw err;
      });
      
    } catch (err) {
      console.log(err);
    }
  }

  async eraseUser(id: string) {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertirlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    });
    if (result.value) {
      try {
        const deletedUser = await this.adminService.deleteUser(id, this.token).catch(err => {
          throw err;
        });
        this.showUsers(this.token);
        Swal.fire(
          'Usuario eliminado',
          'El usuario ha sido eliminado',
          'success'
        )
      } catch (err) {
        Swal.fire({
          title: "Error",
          icon: "error",
          html:
            "Ha ocurrido un error al tratar de eliminar el usuario. Intente de nuevo"
        });
      }
    }
  }

}
