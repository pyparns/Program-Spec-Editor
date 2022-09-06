import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramPageComponent } from './add-program-page.component';

describe('AddProgramPageComponent', () => {
  let component: AddProgramPageComponent;
  let fixture: ComponentFixture<AddProgramPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgramPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProgramPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
