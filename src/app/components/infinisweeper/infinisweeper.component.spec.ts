import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinisweeperComponent } from './infinisweeper.component';

describe('InfinisweeperComponent', () => {
  let component: InfinisweeperComponent;
  let fixture: ComponentFixture<InfinisweeperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfinisweeperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfinisweeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
