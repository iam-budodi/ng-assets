import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OwnedDialogComponent} from './owned-dialog.component';

describe('OwnedDialogComponent', () => {
  let component: OwnedDialogComponent;
  let fixture: ComponentFixture<OwnedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnedDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OwnedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
