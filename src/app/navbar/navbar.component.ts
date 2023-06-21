import {BreakpointObserver} from '@angular/cdk/layout';
import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild,} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isAdmin: boolean = false;
  isProcure: boolean = false;
  userProfile: KeycloakProfile = undefined!;
  routeLinks = [
    {link: 'dashboard', name: 'Dashboard', icon: 'dashboard'},
    {link: 'user', name: 'Users', icon: 'people'},
    {
      header: 'Asset Inventory',
      nav: [
        {link: 'assets', name: 'Assets', icon: 'devices_other'},
        {link: 'purchases', name: 'Purchases', icon: 'credit_card'},
        {link: 'suppliers', name: 'Suppliers', icon: 'store'},
        {link: 'categories', name: 'Categories', icon: 'category'},
      ],
    },
    {
      header: 'Asset Tracking',
      nav: [
        {link: 'allocations', name: 'Asset Assignment', icon: 'assignment'},
        {
          link: 'transfers',
          name: 'Asset Transfer',
          icon: 'transfer_within_a_station',
        },
        {link: 'qr-preview', name: 'Preview QR Code', icon: 'view_list'},
      ],
    },
    {
      header: 'Employee',
      nav: [
        {link: 'employees', name: 'Employees', icon: 'group'},
        {link: 'departments', name: 'Departments', icon: 'account_balance'},
      ],
    },
  ];

  constructor(
    private observer: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private readonly keycloak: KeycloakService
  ) {
  }

  ngOnInit(): void {
    this.isAdmin = this.hasRole('admin');
    this.isProcure = this.hasRole('procure');
    this.loadProfile();
    console.log('ADMIN : ' + this.isAdmin + ' PROCURE : ' + this.isProcure + ' PROFILE : ' + this.userProfile);
  }

  hasRole(role: string): boolean {
    return this.keycloak.getUserRoles().includes(role);
  }

  loadProfile(): Promise<KeycloakProfile> {
     // this.keycloak.loadUserProfile().then((profile: KeycloakProfile ) => this.userProfile = profile);
     return this.keycloak.loadUserProfile();
  }

  async logout(): Promise<void> {
    await this.keycloak.logout();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    this.cd.detectChanges();
  }

  hasAccess(panel: any) {
    return true;
  }
}
