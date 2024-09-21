import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ContactListService } from './contact-list.service';
import { MockData } from '../../../public/mock_data';
import { ContactModal } from '../shared/interface/contact.interface';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Observable,
  of,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { IntersactionOnbserverDirective } from './directive/intersaction-onbserver.directive';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IntersactionOnbserverDirective,
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent {
  @ViewChild('inputSearchbar') inputSearchbar!: ElementRef<HTMLInputElement>;
  contactListService = inject(ContactListService);
  formBuilder = inject(FormBuilder);
  mockData: ContactModal[] = [];
  dataList$ = new Observable<ContactModal[]>();
  newContactForm!: FormGroup;
  editableRowData = <ContactModal>{};
  totalItems = 10000;


  constructor() {
    this.newContactForm = this.formBuilder.group({
      id: [Math.floor(Math.random())],
      contactName: [''],
      email: [''],
      phoneNumber: [''],
    });
  }

  ngAfterViewInit(): void {
    this.contactListService.getUserRecords().subscribe((result: any) => {
      this.mockData = result.sort((a: ContactModal, b: ContactModal) =>
        a.contact_name.localeCompare(b.contact_name)
      );
      this.dataList$ = of(this.mockData.splice(0,50));
    });  

    fromEvent(this.inputSearchbar.nativeElement, 'input')
      .pipe(
        map((e) => (e.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) =>
          this.contactListService
            .getUserRecords()
            .pipe(
              map((records: any[]) =>
                records.filter((record) =>
                  record.contact_name
                    .toLowerCase()
                    .includes(value.toLowerCase())
                )
              )
            )
        )
      )
      .subscribe((filteredRecords) => {
        this.dataList$ = of(filteredRecords);
        console.log(filteredRecords);
      });
  }

  public manageData(index: number, item: ContactModal): number {
    return item.id;
  }

  public editData(contact: ContactModal): void {
    this.editableRowData = JSON.parse(JSON.stringify(contact));
    this.newContactForm.patchValue({
      id: contact.id,
      email: contact.email,
      phoneNumber: contact.phone_number,
      contactName: contact.contact_name,
    });
  }

  public addNewContact(): void {}

  public emitEvent(event: KeyboardEvent): void {
    // this.
  }

  public updateData(): void {
    this.dataList$.subscribe((s) => {
      const updateData = this.newContactForm.value;
      s[s.findIndex((f) => f.id === this.newContactForm.value.id)] = {
        id: updateData.id,
        contact_name: updateData.contactName,
        email: updateData.email,
        phone_number: updateData.phoneNumber,
      };
      this.dataList$ = of(
        s.sort((a, b) => a.contact_name.localeCompare(b.contact_name))
      );
      this.editableRowData = {} as ContactModal;
    });
  }

  public onLoadMore(): void {
    console.log('dada');
  }
}
