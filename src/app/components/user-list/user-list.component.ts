import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { IUser } from "../../models/user";
import { MatDialog } from "@angular/material/dialog";
import { ModalFormComponent } from "../modal-form/modal-form.component";
import { IFilter } from "../../models/filter";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users: IUser[] = [];
  public columnNames: string[] = [
    'registerDate',
    'fio',
    'position',
    'email',
    'password',
    'phoneNumber',
    'actions'
  ]

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.users = this.userService.users;
  }

  public openModal(): void {
    const dialogRef = this.dialog.open(ModalFormComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  public getFilter(filter: IFilter): void {
    let val = filter.fio;
    if (val) {
      this.users = this.users.filter((user: IUser) => {
        return user.fio.toLowerCase().includes(val.toLowerCase());
      });
    } else {
      this.users = this.userService.users;
    }
  }

  public removeUser(row: IUser): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  public updateUser(row: IUser): void {
    let dialogRef = this.dialog.open(ModalFormComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  private refresh(): void {
    this.users = [...this.userService.users];
  }

}
