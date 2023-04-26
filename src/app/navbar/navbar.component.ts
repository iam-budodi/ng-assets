import {BreakpointObserver} from '@angular/cdk/layout';
import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild,} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  routeLinks = [
    {link: 'dashboard', name: 'Dashboard', icon: 'dashboard'},
    {link: 'user', name: 'Users', icon: 'people'},
    {
      header: 'Asset Inventory',
      nav: [
        {link: 'assets', name: 'Assets', icon: 'store'},
        {link: 'purchases', name: 'Purchases', icon: 'store'},
        {link: 'suppliers', name: 'Suppliers', icon: 'store'},
        {link: 'categories', name: 'Categories', icon: 'category'},
      ],
    },
    {
      header: 'Asset Tracking',
      nav: [
        {link: 'allocate', name: 'Allocate Asset', icon: 'assignment'},
        {
          link: 'transfer',
          name: 'Transfer Asset',
          icon: 'transfer_within_a_station',
        },
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
    // private router: Router,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
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
}
