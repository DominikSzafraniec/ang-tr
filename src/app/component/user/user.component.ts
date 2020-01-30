import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../model/User';
import {UserService} from '../../services/UsersService';
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  firstFormGroup: FormGroup;
  users: Array<User> = [];
  sendUser: User;
  userEdit: User;
  showUserPage: string;
  searchUsers: Array<User> = [];
  roleStorage: string;

  constructor(private userService: UserService, private  router: Router, private _formBuilder: FormBuilder) {
  }

  pageShowed(showedPage: string, user: User) {
      if ( showedPage === 'edit') {
        this.showUserPage = showedPage;
        this.editUser(user);
      } else {
        this.showUserPage = showedPage;
        this.userService.getUsers().subscribe(users => {
          this.users = users;
        });
      }
    }
    getUserById() {
        this.userService.getUserById((JSON.parse(localStorage.getItem('loggedUser'))).id).subscribe(users => {
        this.users = users;
      });
      this.editUser(this.users.filter(us => us.id === (JSON.parse(localStorage.getItem('loggedUser'))).id)[0]);
      this.pageShowed('read', null);
    }
    editUser(user: User) {
      console.log(user);
      this.userEdit = user;
      this.firstFormGroup = this._formBuilder.group({
        id: user.id,
        username: user.username,
        role: user.role,
        password: user.password,
        firstName: user.firstName,
        familyName: user.familyName,
        address: user.address,
        phoneNumber: user.phoneNumber
    });
  }
  addUser(user: User): void {
      this.sendUser.id = null;
      this.sendUser.username = user.username;
      this.sendUser.role = user.role;
      this.sendUser.password = user.password;
      this.sendUser.firstName = user.firstName;
      this.sendUser.familyName = user.familyName;
      this.sendUser.address = user.address;
      this.sendUser.phoneNumber = user.phoneNumber;
      console.log(this.sendUser);
      console.log(JSON.stringify(this.userService.addUser(this.sendUser)));
      this.sendUser = null;
      this.clearForm();
      this.pageShowed('read', null);
  }

  updateUser(user: User) {
    this.userEdit.username = user.username;
    if (user.role != null) {
      this.userEdit.role = user.role;
    } else {
      this.userEdit.role = (JSON.parse(localStorage.getItem('loggedUser'))).role;
    }
    this.userEdit.password = user.password;
    this.userEdit.firstName = user.firstName;
    this.userEdit.familyName = user.familyName;
    this.userEdit.address = user.address;
    this.userEdit.phoneNumber = user.phoneNumber;
    console.log(this.userService.updateUser(this.userEdit));
    this.clearForm();
    this.userEdit = null;
    this.pageShowed('read', null);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(users => {
      this.searchUsers = users;
    });
    this.pageShowed('read', null);
  }

  clearForm() {
    this.firstFormGroup = this._formBuilder.group({
      id: 0,
      username: [''],
      role: [''],
      password: [''],
      firstName: [''],
      familyName: [''],
      address: [''],
      phoneNumber: 0
    });
  }


  ngOnInit() {
    this.sendUser = new User();
    this.roleStorage = (JSON.parse(localStorage.getItem('loggedUser'))).role;
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.firstFormGroup = this._formBuilder.group({
      id: null,
      username: [''],
      role: [''],
      password: [''],
      firstName: [''],
      familyName: [''],
      address: [''],
      phoneNumber: 0
    });
    this.pageShowed('read', null);
  }

}
