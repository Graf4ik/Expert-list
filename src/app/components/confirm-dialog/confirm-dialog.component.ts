import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { IUser } from  "../../models/user";
import { UserService} from "../../services/user.service";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  protected confirmDelete(): void {
    this.userService.deleteUser(this.data.id);
    this.dialog.closeAll();
  }

  protected closeDialog(): void {
    this.dialog.closeAll();
  }
}
