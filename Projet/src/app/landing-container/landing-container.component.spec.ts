import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingContainerComponent } from './landing-container.component';

describe('LandingContainerComponent', () => {
  let component: LandingContainerComponent;
  let fixture: ComponentFixture<LandingContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingContainerComponent]
    });
    fixture = TestBed.createComponent(LandingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
