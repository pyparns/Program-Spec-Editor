import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSpecPageComponent } from './program-spec-page.component';

describe('ProgramSpecPageComponent', () => {
  let component: ProgramSpecPageComponent;
  let fixture: ComponentFixture<ProgramSpecPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramSpecPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramSpecPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
