import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // @Input() isExpanded: boolean | undefined;
  // @Output() toggleMenu = new EventEmitter();

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  // routeLinks = [
  //   { link: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
  //   { link: 'users', name: 'Users', icon: 'people' },
  //   { link: 'assets', name: 'Assets', icon: 'store' },
  //   { link: 'categories', name: 'Categories', icon: 'category' },
  //   { link: 'allocate', name: 'Allocate Asset', icon: 'assignment' },
  //   {
  //     link: 'transfer',
  //     name: 'Transfer Asset',
  //     icon: 'transfer_within_a_station',
  //   },
  //   { link: 'employees', name: 'Employees', icon: 'group' },
  //   { link: 'departments', name: 'Departments', icon: 'account_balance' },
  // ];

  routeLinks = [
    { link: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
    { link: 'users', name: 'Users', icon: 'people' },
    {
      header: 'Asset Inventory',
      nav: [
        { link: 'assets', name: 'Assets', icon: 'store' },
        { link: 'categories', name: 'Categories', icon: 'category' },
      ],
    },
    {
      header: 'Asset Tracking',
      nav: [
        { link: 'allocate', name: 'Allocate Asset', icon: 'assignment' },
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
        { link: 'employees', name: 'Employees', icon: 'group' },
        { link: 'departments', name: 'Departments', icon: 'account_balance' },
      ],
    },
  ];

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {}

  // ngAfterViewInit() {
  //   this.observer
  //     .observe(['(max-width: 800px)'])
  //     .pipe(delay(1), untilDestroyed(this))
  //     .subscribe((res: any) => {
  //       if (res.matches) {
  //         this.sidenav.mode = 'over';
  //         this.sidenav.close();
  //       } else {
  //         this.sidenav.mode = 'side';
  //         this.sidenav.open();
  //       }
  //     });

  //   this.router.events
  //     .pipe(
  //       untilDestroyed(this),
  //       filter((e) => e instanceof NavigationEnd)
  //     )
  //     .subscribe(() => {
  //       if (this.sidenav.mode === 'over') {
  //         this.sidenav.close();
  //       }
  //     });
  // }

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
