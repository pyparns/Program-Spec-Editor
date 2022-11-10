import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUiSpecPageComponent } from './add-ui-spec-page.component';

describe('AddUiSpecPageComponent', () => {
  let component: AddUiSpecPageComponent;
  let fixture: ComponentFixture<AddUiSpecPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUiSpecPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUiSpecPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
