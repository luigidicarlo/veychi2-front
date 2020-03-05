import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { AuthService } from '../../../services/auth.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-vendors-request',
  templateUrl: './vendors-request.component.html',
  styleUrls: ['./vendors-request.component.css']
})
export class VendorsRequestComponent implements OnInit {

  token: any = '';
  vendors: any;
  actualPage: number = 1;

  constructor(public auth: AuthService, public adminService: AdminService) { }

  ngOnInit() {
    this.token = this.auth.loadSession();
    this.showVendorRequest(this.token);
  }

  // Método para obtener a todos las tiendas pendientes por aprobación
  async showVendorRequest(token: string) {
    try {
      this.vendors = await this.adminService.getVendorRequests(token).catch(err => {
        throw err;
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Método para aprobar a una tienda.
  async verifyVendor(id: string) {

    // Modal para confirmar si se desea aprobar la petición
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

    // Aprobando tienda si se confirma la petición
    if (result.value) {
      Swal.fire("Procesando...");
      Swal.showLoading();
      try {
        const updatedVendor = await this.adminService.updateVendor(id, this.token).catch(err => {
          throw err;
        });
        this.showVendorRequest(this.token);
        Swal.fire(
          'Tienda aprobada',
          'La tienda ha sido aprobada',
          'success'
        )
      } catch (err) {
        Swal.fire({
          title: "Error",
          icon: "error",
          html:
            "Ha ocurrido un error al tratar de aprobar esta tienda. Intente de nuevo"
        });
      }
    }
  }

}
