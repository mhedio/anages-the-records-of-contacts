
import { Contact } from './../models/contact';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  apiUrl="http://localhost:5000/contacts";

  constructor(private http: HttpClient) { }

  findAll(){
   return this.http.get<Contact[]>(this.apiUrl);
  }
  delete(id: number | undefined){
    return this.http.delete(`${this.apiUrl}/${id}`)

  }
  persist(contact: Contact) {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  update(contact: Contact){
    return this.http.put(`${this.apiUrl}/${contact.id}`, contact)
  }
}
