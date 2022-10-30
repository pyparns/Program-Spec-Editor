import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAnalystPageComponent } from './system-analyst-page.component';

describe('SystemAnalystPageComponent', () => {
  let component: SystemAnalystPageComponent;
  let fixture: ComponentFixture<SystemAnalystPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemAnalystPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemAnalystPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
