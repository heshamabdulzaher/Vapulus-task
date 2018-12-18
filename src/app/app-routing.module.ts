import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { AddNewContactComponent } from "./add-new-contact/add-new-contact.component";
const routes: Routes = [
  { path: "", redirectTo: "contact-list", pathMatch: "full" },
  { path: "contact-list", component: ContactListComponent },
  { path: "add-new-contact", component: AddNewContactComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [ContactListComponent, AddNewContactComponent];
