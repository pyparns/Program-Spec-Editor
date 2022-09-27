import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSpecVersionComponent } from './program-spec-version.component';

describe('ProgramSpecVersionComponent', () => {
  let component: ProgramSpecVersionComponent;
  let fixture: ComponentFixture<ProgramSpecVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramSpecVersionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramSpecVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
