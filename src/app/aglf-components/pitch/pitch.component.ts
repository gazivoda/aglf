import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player, Position } from 'app/aglf-classes/player';

@Component({
    selector: 'app-pitch',
    templateUrl: './pitch.component.html',
    styleUrls: ['./pitch.component.scss']
})
export class PitchComponent implements OnInit {

    @Input()
    selectedPlayers = [];

    @Output()
    removePlayerEventEmitter: EventEmitter<Player> = new EventEmitter<Player>();

    @Output()
    selectPositionEventEmitter: EventEmitter<Position> = new EventEmitter<Position>();

    @Output()
    openPlayerModalEventEmitter: EventEmitter<Player> = new EventEmitter<Player>();

    constructor() { }

    ngOnInit() {
    }

    removePlayerEventHandler(player: Player) {
        this.removePlayerEventEmitter.emit(player);
    }

    selectPositionEventHandler(position: Position) {
        this.selectPositionEventEmitter.emit(position);
    }

    openPlayerModalEventHandler(player: Player) {
        this.openPlayerModalEventEmitter.emit(player);
    }

}
