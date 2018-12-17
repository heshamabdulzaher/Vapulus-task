import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
  constructor(private http: HttpClient) {}

  alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  allContacts;
  recentContacts;

  ngOnInit() {
    this.getRecentContacts();
    this.getAllContacts();
  }
  // Get Recent contacts
  getRecentContacts() {
    this.http.get("http://localhost:3000/recent-contact").subscribe(res => {
      this.recentContacts = res;
    });
  }
  // Get All contacts
  getAllContacts() {
    this.http.get("http://localhost:3000/contacts").subscribe((data: any) => {
      // we want to group the items by the first letter
      let formatedDataAsObject = data.reduce((acc, current) => {
        let firstLetter = current.firstName.charAt().toLowerCase();

        // If accumulator have this letter
        if (acc[firstLetter]) {
          acc[firstLetter]["items"].push(current);
        } else {
          // If don't
          acc[firstLetter] = {
            letter: firstLetter,
            items: [current]
          };
        }
        return acc;
      }, {});

      // Convert the data to array so we can easily loop over it
      let formatedDataAsArray = [];
      for (let key in formatedDataAsObject) {
        formatedDataAsArray.push(formatedDataAsObject[key]);
      }
      this.allContacts = formatedDataAsArray;
    });
  }
}
