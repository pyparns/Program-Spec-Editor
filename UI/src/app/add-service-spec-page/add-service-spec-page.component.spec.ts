import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceSpecPageComponent } from './add-service-spec-page.component';

describe('AddServiceSpecPageComponent', () => {
  let component: AddServiceSpecPageComponent;
  let fixture: ComponentFixture<AddServiceSpecPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceSpecPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiceSpecPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
