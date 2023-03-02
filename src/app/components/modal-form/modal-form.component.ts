import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { IUser, POSITIONS } from "../../models/user";
import { UserService } from "../../services/user.service";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import * as moment from 'moment';
import { UUID } from 'angular2-uuid';
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DatePipe } from "@angular/common";

export const MY_FORMATS = {
  parse: {
    dateInput: "DD-MM-YYYY"
  },
  display: {
    dateInput: "DD-MM-YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "YYYY-MM-DD",
    monthYearA11yLabel: "MMMM YYYY"
  }
}

@Component({
  selector: 'app-add-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ]
})
export class ModalFormComponent implements OnInit {
  public addForm!: FormGroup;
  public positions: POSITIONS[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private userService: UserService,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.positions = this.userService.getPositions();
    this.initForm();
  }

  private initForm(): void {
    this.addForm = this.fb.group({
      id: this.data ? this.data.id : UUID.UUID(),
      registerDate: [this.data ? this.data.registerDate : '',
        [Validators.required]
      ],
      fio: [ this.data ? this.data.fio : '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(256)]
      ],
      position: [
        this.data ? this.data.position : '',
        [Validators.required]
      ],
      email: [
        this.data ? this.data.email : '',
        [Validators.required, Validators.email],
      ],
      password: [ this.data ? this.data.password : '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(256),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/),
        ]
      ],
      phoneNumber: [
        this.data ? this.data.phoneNumber : '',
        [Validators.required],
      ],
    })
  }

  public save(): void {
    this.preparePhone();
    this.formatDate();
    this.userService.createUser(this.addForm.value);
    this.dialog.closeAll();
  }

  public edit(): void {
    this.formatDate();
    this.userService.updateUser(this.addForm.value);
    this.dialog.closeAll();
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }

  private formatDate(): void {
    this.addForm.get('registerDate')?.setValue(
      moment(this.addForm.get('registerDate')?.value).format('YYYY-MM-DD'));
  }

  private preparePhone(): void {
    const code: string = '+7';
    const phoneNumberControl = this.addForm.get('phoneNumber');
    phoneNumberControl?.setValue(code + phoneNumberControl.value);
  }
}
