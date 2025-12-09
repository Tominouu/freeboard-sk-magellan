import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SogDisplayComponent } from './sog-display.component';

describe('SogDisplayComponent', () => {
  let component: SogDisplayComponent;
  let fixture: ComponentFixture<SogDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SogDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SogDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
