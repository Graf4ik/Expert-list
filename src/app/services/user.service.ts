import { Injectable } from '@angular/core';
import { mockUsers } from "../constants/constants";
import {IUser, POSITIONS} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users: IUser[] = mockUsers;
  private positions: POSITIONS[] = [
    POSITIONS.PM,
    POSITIONS.DEVELOPER,
    POSITIONS.HR,
    POSITIONS.QA,
  ];

  public createUser(user: IUser): void {
    this.users.push(user);
  }

  public getPositions(): POSITIONS[] {
    return this.positions;
  }

  public deleteUser(id: string): void {
    this.users = this.users.filter((user: IUser) => user.id !== id);
  }

  public updateUser(editedUser: IUser): void {
    const oldUserIndex = this.users.findIndex(
      (user: IUser) => user.id === editedUser['id']
    );
    this.users[oldUserIndex] = editedUser;
  }
}
