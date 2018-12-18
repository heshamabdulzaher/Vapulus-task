import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-new-contact",
  templateUrl: "./add-new-contact.component.html",
  styleUrls: ["./add-new-contact.component.css"]
})
export class AddNewContactComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  photoUploadedSrc;

  ngOnInit() {}

  handlerFunction(contactForm) {
    console.log(contactForm.form.value);
    if (contactForm.form.valid) {
      // Done
      this.http
        .post("http://localhost:3000/contacts", contactForm.form.value)
        .subscribe(res => {
          contactForm.form.reset();
          this.router.navigate(["/"]);
        });
    }
  }

  readURL(e, avatar) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (res: any) => {
        avatar.style.backgroundImage = `url(' ${res.target.result} ')`;
        avatar.style.backgroundSize = "cover";
        avatar.style.border = "0";
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
}
