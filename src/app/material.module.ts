import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '@angular/cdk/layout';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatMomentDateModule, MomentDateAdapter} from "@angular/material-moment-adapter";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

export const MY_CUSTOM_DATE_FORMAT = {
  parse: {
    dateInput: 'YYYY-MM-DD'
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    LayoutModule,
    FlexLayoutModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatButtonToggleModule,
  ],
  exports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    LayoutModule,
    FlexLayoutModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatButtonToggleModule,
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB',},
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_CUSTOM_DATE_FORMAT
    }],

})

export class MaterialModule {
}
