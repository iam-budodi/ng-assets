import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodDialogComponent } from './hod-dialog.component';

describe('HodDialogComponent', () => {
  let component: HodDialogComponent;
  let fixture: ComponentFixture<HodDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HodDialogComponent]
    });
    fixture = TestBed.createComponent(HodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
