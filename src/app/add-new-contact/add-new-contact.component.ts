import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-add-new-contact",
  templateUrl: "./add-new-contact.component.html",
  styleUrls: ["./add-new-contact.component.css"]
})
export class AddNewContactComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  handlerFunction(contactForm) {
    if (contactForm.form.valid) {
      // Done
      this.http
        .post("http://localhost:3000/contacts", contactForm.form.value)
        .subscribe(res => {
          // 500 Internal Server Error
        });
    }
  }
}
