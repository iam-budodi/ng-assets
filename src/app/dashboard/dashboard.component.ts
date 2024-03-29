import {Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {cardLayout} from '../shared/card.layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
    // cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    //   map(({ matches }) => {
    //     if (matches) {
    //       return {
    //         columns: 1,
    //         minCard: { cols: 1, rows: 1 },
    //         chart: { cols: 1, rows: 2 },
    //         table: { cols: 1, rows: 4 },
    //       };
    //     }

    //     return {
    //       columns: 4,
    //       minCard: { cols: 1, rows: 1 },
    //       chart: { cols: 2, rows: 2 },
    //       table: { cols: 4, rows: 4 },
    //     };
    //   })
    // );

  cardLayout = cardLayout(this.breakpointObserver);

  constructor(private breakpointObserver: BreakpointObserver) {
  }
}
