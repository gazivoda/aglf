import { Component } from '@angular/core';
import { PlayersService} from 'app/services/players.service';

@Component({
  selector: 'app-status',
  templateUrl: 'status.page.html',
  styleUrls: ['status.page.scss'],
})
export class StatusPage {

    constructor(private playersService: PlayersService) {
    }

    ngOnInit() {
        this.playersService.getPlayers().subscribe(data => console.log(data));
    }
}
