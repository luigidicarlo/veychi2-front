import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Veychi";

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit() {
    const token = localStorage.getItem("session");

    if (!token) {
      this.auth.isLoggedIn = false;
      this.auth.onLoginEmitter.emit(null);
      localStorage.removeItem("session");
    } else {
      this.userService.getLoggedinUser(token)
        .then(user => {
          this.auth.isLoggedIn = true;
          this.auth.onLoginEmitter.emit(user);
        })
        .catch(err => {
          this.auth.isLoggedIn = false;
          this.auth.onLoginEmitter.emit(null);
          localStorage.removeItem("session");
        });
    }
  }
}
