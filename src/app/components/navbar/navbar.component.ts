import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { CategoryService } from "src/app/services/category.service";
import User from "src/app/models/user.model";
import Category from "src/app/models/category.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  searchForm = new FormGroup({
    s: new FormControl("")
  });

  categories: Category;
  keys: string;
  toggleClass = "toggle";
  togglerClass = "navbar-toggler";
  isLoggedIn = false;

  private isToggled: boolean;

  constructor(private auth: AuthService, private router: Router,
    private categoryService: CategoryService) {}

  ngOnInit() {
    this.isToggled = false;
    this.auth.onLoginEmitter.subscribe((user: User) => {
      if (user === null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = this.auth.isLoggedIn = true;
      }
    });
    this.showCategories();
  }

  toggleNavbar() {
    this.isToggled = !this.isToggled;
    if (this.isToggled) {
      this.toggleClass = "toggle show";
      this.togglerClass = "navbar-toggler show";
    } else {
      this.toggleClass = "toggle";
      this.togglerClass = "navbar-toggler";
    }
    this.showCategories();
  }

  logout() {
    this.toggleNavbar();
    this.auth.destroySession();
    Swal.fire({
      title: "Has cerrado la sesión"
    });
  }

  onSubmit() {
    const searchInput = this.searchForm.get('s').value as string;
    this.keys = searchInput.split(' ').join('+').toLowerCase();
    console.log(this.keys);
    this.router.navigate([`/busqueda/${this.keys}`]);
  }

  async showCategories() {
    try {
      this.categories = await this.categoryService.getCategories().catch(err => {
        throw err;
      });
    } catch (err) {
      console.log(err);
    }
  }
}
