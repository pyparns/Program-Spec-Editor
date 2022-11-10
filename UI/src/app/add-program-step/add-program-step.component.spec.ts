import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramStepComponent } from './add-program-step.component';

describe('AddProgramStepComponent', () => {
  let component: AddProgramStepComponent;
  let fixture: ComponentFixture<AddProgramStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgramStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProgramStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
