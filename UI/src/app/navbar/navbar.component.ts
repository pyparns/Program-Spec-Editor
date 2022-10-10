import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    username: string = '';
    isLoggedIn: boolean = false;

    constructor(
        private router: Router,
        private accountService: AccountService,
        private messageService: MessageService
    ) { }

    items!: MenuItem[];
    accItems!: MenuItem[];

    ngOnInit() {
        this.accountService.userValue.subscribe((item: any) => {
            if (item) {
                this.username = item.username;
                this.isLoggedIn = true;
            }
            else {
                this.username = '';
                this.isLoggedIn = false;
            }
        });

        this.items = [
            {
                label:'Home',
                icon:'pi pi-fw pi-home',
                routerLink: "/home"
            },
            {
                label:'Add',
                icon:'pi pi-fw pi-pencil',
                items:[
                    {
                        label:'Blank form',
                        icon:'pi pi-fw pi-align-center',
                        routerLink: "/create/spec/blankform"
                    },
                    {
                        label:'Import spec',
                        icon:'pi pi-fw pi-upload',
                        routerLink: "/create/spec/import"
                    },
                ]
            },
            {
                label:'Users',
                icon:'pi pi-fw pi-user',
                items:[
                    {
                        label:'Login',
                        icon:'pi pi-fw pi-sign-in',
                        routerLink: "/account/login"

                    },
                    {
                        label:'Register',
                        icon:'pi pi-fw pi-user-plus',
                        routerLink: "/account/register"
                    },
                ]
            }
        ];
        
        this.accItems = [
            {label: 'Edit Profile', routerLink: "/account/edit"},
            {separator: true},
            {label: 'Logout', command: () => {
                this.accountService.logout();
                this.messageService.add({key: 'tl', severity: 'success', summary: 'Logout successful', detail: ''});
            }}
        ];
    }

    toProfile(): any {
        this.router.navigate(['/account/profile']);
    }
}
