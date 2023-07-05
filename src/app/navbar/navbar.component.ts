import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
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
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isAdmin: boolean = false;
  isProcure: boolean = false;
  userProfile: KeycloakProfile | undefined = undefined;
  designation!: string;
  logo: any = '[Logo Placeholder]';

  routeLink: { link: string, name: string, icon: string } = {link: 'dashboard', name: 'Dashboard', icon: 'dashboard'};

  routePanel = [
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
        {link: 'college', name: 'College', icon: 'school'},
        {link: 'departments', name: 'Departments', icon: 'account_balance'},
        {link: 'employees', name: 'Employees', icon: 'group'},
      ],
    },
    {
      header: 'Reports',
      nav: [
        {link: 'employee-report', name: 'Employee Reports', icon: 'file_copy'},
        {link: 'asset-report', name: 'Asset Reports', icon: 'file_copy'},
        {link: 'allocation-report', name: 'Allocation Reports', icon: 'file_copy'},
        {link: 'transfer-report', name: 'Change Custodianship Reports', icon: 'file_copy'},
        // {link: 'reports', name: 'Generate Reports', icon: 'file_copy'}
      ],
    },
  ]

  constructor(
    private observer: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private readonly keycloak: KeycloakService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.isAdmin = this.hasRole('admin');
    this.isProcure = this.hasRole('procure');
    await this.loadProfile();
  }

  hasRole(role: string): boolean {
    const isRole: boolean = this.keycloak.getUserRoles().includes(role);
    if (isRole) this.getDesignation(role);
    return isRole;
  }

  async loadProfile(): Promise<void> {
    // this.keycloak.loadUserProfile().then((profile: KeycloakProfile ) => this.userProfile = profile);
    this.userProfile = await this.keycloak.loadUserProfile();
  }

  getDesignation(role: string): void {
    if (role === 'procure') this.designation = 'Procurement Officer - Administration';
    else if (role === 'admin') this.designation = 'IT Administrator';
  }

  async logout(): Promise<void> {
    await this.keycloak.logout();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res: BreakpointState): void => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav?.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav?.open();
      }
    });

    this.cd.detectChanges();
  }
}
