import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  // Use the names `name`, `email`, `password` for the form controls.
  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary
  ) {
    library.addIconPacks(fas);
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
      ]),
    });
  }

  form: any;
  authors: string[] = [];
  durationTime: number = 0;

  get name() {
    return this.form.get("name");
  }

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }

  removeAuthor(author: string) {
    this.authors = this.authors.filter((a) => a !== author);
  }

  createAuthor(author: string) {
    this.authors.push(author);
  }

  getDurationFormatted(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  }
}
