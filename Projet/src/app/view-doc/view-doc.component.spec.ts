import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocComponent } from './view-doc.component';

describe('ViewDocComponent', () => {
  let component: ViewDocComponent;
  let fixture: ComponentFixture<ViewDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDocComponent]
    });
    fixture = TestBed.createComponent(ViewDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
