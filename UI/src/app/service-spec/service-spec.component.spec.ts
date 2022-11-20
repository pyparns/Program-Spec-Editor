import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSpecComponent } from './service-spec.component';

describe('ServiceSpecComponent', () => {
  let component: ServiceSpecComponent;
  let fixture: ComponentFixture<ServiceSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceSpecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
