import { Component, OnInit } from '@angular/core';
import { EndpointService } from '../services/endpoint.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {

  topUsers: any[] = [];
  userDetails: any = {};

  constructor(private endpointService: EndpointService, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserDetails()
      .subscribe((data: any) => {
        this.userDetails = data;
      });

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
    if (players && players.length > 0 && players.find(player => player.captain)) {
      return players.find(player => player.captain);
    }
    if (players.length > 0) {
      return players.find(player => player.jerseyUrl !== '');
    }
    return null;
  }

}
