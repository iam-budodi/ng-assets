import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodListComponent } from './hod-list.component';

describe('HodListComponent', () => {
  let component: HodListComponent;
  let fixture: ComponentFixture<HodListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HodListComponent]
    });
    fixture = TestBed.createComponent(HodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
