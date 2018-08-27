import {Component, OnInit} from '@angular/core';
import {EndpointService} from '../../aglf-services/endpoint.service';

@Component({
  selector: 'app-leaderboard-overview',
  templateUrl: './leaderboard-overview.component.html',
  styleUrls: ['./leaderboard-overview.component.scss']
})
export class LeaderboardOverviewComponent implements OnInit {
  topUsers: any[] = [];

  constructor(private endpointService: EndpointService) {
  }

  ngOnInit() {
    this.endpointService.getTopUsers().subscribe((data: any) => {
      this.topUsers = data;
    });
  }

  totalTeamCost(players: any[]) {
    if (players && players.length > 0) {
      return players.map(player => player.price).reduce((a, c) => a + c);
    }
    return 0;
  }

  captainImage(players: any[]) {
    if (players && players.length > 0) {
      return players.find(player => player.captain);
    }
    if (players.length > 0) {
      return players[0];
    }
    return null;
  }

}
