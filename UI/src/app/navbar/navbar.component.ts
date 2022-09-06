import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  items!: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label:'Home',
                icon:'pi pi-fw pi-file',
                routerLink: "/home"
            },
            {
                label:'Add',
                icon:'pi pi-fw pi-pencil',
                items:[
                    {
                        label:'Blank form',
                        icon:'pi pi-fw pi-align-left',
                        routerLink: "/addprogram"
                    },
                    {
                        label:'Import spec',
                        icon:'pi pi-fw pi-align-right',
                        routerLink: "/importspec"
                    },
                ]
            },
            {
                label:'Users',
                icon:'pi pi-fw pi-user',
                items:[
                    {
                        label:'Login',
                        icon:'pi pi-fw pi-user-plus',
                        routerLink: "/login"

                    },
                    {
                        label:'Register',
                        icon:'pi pi-fw pi-user-plus',
                        routerLink: "/register"
                    },
                ]
            },
            {
                label:'Events',
                icon:'pi pi-fw pi-calendar',
                items:[
                    {
                        label:'Edit',
                        icon:'pi pi-fw pi-pencil',
                        items:[
                        {
                            label:'Save',
                            icon:'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label:'Delete',
                            icon:'pi pi-fw pi-calendar-minus'
                        },

                        ]
                    },
                    {
                        label:'Archieve',
                        icon:'pi pi-fw pi-calendar-times',
                        items:[
                        {
                            label:'Remove',
                            icon:'pi pi-fw pi-calendar-minus'
                        }
                        ]
                    }
                ]
            }
        ];
    }

}
