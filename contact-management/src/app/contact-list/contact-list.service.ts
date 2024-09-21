import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactList, ContactModal } from '../shared/interface/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactListService {
  constructor(private httpClient: HttpClient) {}

  public getUserRecords(): Observable<ContactList> {
    return this.httpClient.get<ContactList>('/json/MOCK_DATA.json')
  }
}
