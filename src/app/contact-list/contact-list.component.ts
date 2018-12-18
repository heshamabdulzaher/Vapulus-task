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
  formatedContacts;
  recentContacts;
  serachMode: boolean = false;
  searchQueryWord: string = "";
  searchResultItems = [];

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
      this.allContacts = data;
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
      this.formatedContacts = formatedDataAsArray;
    });
  }

  // Toggle Search mode to show and hidden search results
  toggleSearchMode() {
    this.serachMode = !this.serachMode;
  }

  // Get seach query word
  getSearchQueryWors(e) {
    this.searchResultItems = [];
    // search with query word over all contacts and that contact will match push it in searchResultItems array
    this.allContacts.forEach(item => {
      if (!item.firstName.toLowerCase().search(e)) {
        this.searchResultItems.push(item);
      }
    });
  }
}
