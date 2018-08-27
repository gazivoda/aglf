import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardOverviewComponent } from './leaderboard-overview.component';

describe('LeaderboardOverviewComponent', () => {
  let component: LeaderboardOverviewComponent;
  let fixture: ComponentFixture<LeaderboardOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
