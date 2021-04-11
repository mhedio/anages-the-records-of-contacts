
import { ContactService } from 'src/app/services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  searchText = '';

  showForm = false;
  editForm =false;

  myContact: Contact = {
    name: '',
    surname: '',
    number: '',
    birthday: '',
    address: '',
  }

  contacts: Contact[] = [];
  resultContacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

getContacts(){
  this.contactService.findAll()
  .subscribe(contacts =>{
      this.resultContacts = this.contacts = contacts
    })
}

deleteContact(id: number | undefined){
  this.contactService.delete(id)
  .subscribe(() => {
   this.contacts = this.contacts.filter(contact => contact.id != id)
  })
 }

 persistContact() {
  this.contactService.persist(this.myContact)
      .subscribe((contact) => {
        this.contacts = [contact, ...this.contacts];
        this.resetContact();
        this.showForm = false;
      })
}

resetContact(){
  this.myContact = {
    name: '',
    surname: '',
    number: '',
    birthday: '',
    address: '',
  }
}

editContact(contact: Contact){
  this.myContact = contact
  this.editForm = true;

}


updateContact(){
  this.contactService.update(this.myContact)
  .subscribe(() =>{
     this.resetContact();
     this.editForm = false;
  })
}

searchContact(){
  this.resultContacts = this.contacts.filter((contact) => contact.name.toLowerCase().includes(this.searchText.toLowerCase()))
}


}
