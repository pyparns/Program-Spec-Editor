import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSpecComponent } from './component-spec.component';

describe('ComponentSpecComponent', () => {
  let component: ComponentSpecComponent;
  let fixture: ComponentFixture<ComponentSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentSpecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
