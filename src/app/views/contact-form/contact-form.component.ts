import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.css"]
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({
    nombre: new FormControl("", [
      Validators.required,
      Validators.pattern("^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ ]+$"),
      Validators.minLength(2)
    ]),
    correo: new FormControl("", [Validators.required, Validators.email]),
    asunto: new FormControl("", [Validators.required, Validators.minLength(3)]),
    mensaje: new FormControl("", [
      Validators.required,
      Validators.minLength(50)
    ])
  });

  constructor() {}

  ngOnInit() {}

  onSubmit() {}
}
