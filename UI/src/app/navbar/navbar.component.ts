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
                label:'Add Spec',
                icon:'pi pi-fw pi-pencil',
                routerLink: "/create/spec/program"
            },
            {
                label:'Project',
                icon:'pi pi-fw pi-globe',
                items:[
                    {
                        label:'Project',
                        icon:'pi pi-fw pi-folder-open',
                        routerLink: "/project"
                    },
                    {
                        label:'System',
                        icon:'pi pi-fw pi-sitemap',
                        routerLink: "/system"
                    },
                    {
                        label:'System Analyst',
                        icon:'pi pi-fw pi-users',
                        routerLink: "/system-analyst"
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
            {label: 'My Profile', routerLink: "/account/profile"},
            {label: 'Bookmark', routerLink: "/account/bookmark"},
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
