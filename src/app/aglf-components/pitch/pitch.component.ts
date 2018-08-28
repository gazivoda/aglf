import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'app/aglf-classes/player';

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

    constructor() { }

    ngOnInit() {
    }

    removePlayerEventHandler(player: Player) {
        this.removePlayerEventEmitter.emit(player);
    }

}
