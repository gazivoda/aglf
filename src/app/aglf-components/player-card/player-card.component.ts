import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'app/aglf-classes/player';

@Component({
    selector: 'app-player-card',
    templateUrl: './player-card.component.html',
    styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {

    @Input()
    index: number;

    @Input()
    player: Player;

    x: number;
    y: number;

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges() {
        this.resolveCoordinates(this.index);
    }

    resolveCoordinates(index: number) {
        switch (index) {
            // GK1
            case 0:
                this.x = -80;
                this.y = 400;
                break;

            // GK2
            case 1:
                this.x = 80;
                this.y = 400;
                break;

            // D1
            case 2:
                this.x = -260;
                this.y = 280;
                break;

            // D2
            case 3:
                this.x = -130;
                this.y = 280;
                break;

            // D3
            case 4:
                this.x = 0;
                this.y = 280;
                break;

            // D4
            case 5:
                this.x = 130;
                this.y = 280;
                break;

            // D5
            case 6:
                this.x = 260;
                this.y = 280;
                break;

            // M1
            case 7:
                this.x = -270;
                this.y = 40;
                break;

            // M2
            case 8:
                this.x = -140;
                this.y = 40;
                break;

            // M3
            case 9:
                this.x = 0;
                this.y = 40;
                break;

            // M4
            case 10:
                this.x = 140;
                this.y = 40;
                break;

            // M5
            case 11:
                this.x = 270;
                this.y = 40;
                break;

            // F1
            case 12:
                this.x = -110;
                this.y = -190;
                break;

            // F2
            case 13:
                this.x = 0;
                this.y = -190;
                break;

            // F3
            case 14:
                this.x = 110;
                this.y = -190;
                break;
        }
    }

}
