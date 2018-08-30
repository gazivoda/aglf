import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player, Position } from 'app/aglf-classes/player';

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

    @Output()
    removePlayerEventEmitter: EventEmitter<Player> = new EventEmitter<Player>();

    @Output()
    selectPositionEventEmitter: EventEmitter<Position> = new EventEmitter<Position>();

    @Output()
    openPlayerModalEventEmitter: EventEmitter<Player> = new EventEmitter<Player>();

    position: Position;

    x: number;
    y: number;

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges() {
        this.resolveCoordinates(this.index);
    }

    removePlayer() {
        this.removePlayerEventEmitter.emit(this.player);
    }

    selectPosition() {
        this.selectPositionEventEmitter.emit(this.position);
    }

    openPlayerModal(player: Player) {
        this.openPlayerModalEventEmitter.emit(player);
    }

    resolveCoordinates(index: number) {
        switch (index) {
            // GK1
            case 0:
                this.position = Position.GOALKEEPER;
                this.x = -120;
                this.y = -200;
                break;

            // GK2
            case 1:
                this.position = Position.GOALKEEPER;
                this.x = 120;
                this.y = -200;
                break;

            // D1
            case 2:
                this.position = Position.DEFENDER;
                this.x = -500;
                this.y = -30;
                break;

            // D2
            case 3:
                this.position = Position.DEFENDER;
                this.x = -250;
                this.y = -30;
                break;

            // D3
            case 4:
                this.position = Position.DEFENDER;
                this.x = 0;
                this.y = -30;
                break;

            // D4
            case 5:
                this.position = Position.DEFENDER;
                this.x = 250;
                this.y = -30;
                break;

            // D5
            case 6:
                this.position = Position.DEFENDER;
                this.x = 500;
                this.y = -30;
                break;

            // M1
            case 7:
                this.position = Position.MIDFIELDER;
                this.x = -500;
                this.y = 150;
                break;

            // M2
            case 8:
                this.position = Position.MIDFIELDER;
                this.x = -250;
                this.y = 150;
                break;

            // M3
            case 9:
                this.position = Position.MIDFIELDER;
                this.x = 0;
                this.y = 150;
                break;

            // M4
            case 10:
                this.position = Position.MIDFIELDER;
                this.x = 250;
                this.y = 150;
                break;

            // M5
            case 11:
                this.position = Position.MIDFIELDER;
                this.x = 500;
                this.y = 150;
                break;

            // F1
            case 12:
                this.position = Position.STRIKER;
                this.x = -375;
                this.y = 350;
                break;

            // F2
            case 13:
                this.position = Position.STRIKER;
                this.x = 0;
                this.y = 350;
                break;

            // F3
            case 14:
                this.position = Position.STRIKER;
                this.x = 375;
                this.y = 350;
                break;
        }
    }

}
