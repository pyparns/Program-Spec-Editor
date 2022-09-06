import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSpecPageComponent } from './import-spec-page.component';

describe('ImportSpecPageComponent', () => {
  let component: ImportSpecPageComponent;
  let fixture: ComponentFixture<ImportSpecPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportSpecPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportSpecPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
