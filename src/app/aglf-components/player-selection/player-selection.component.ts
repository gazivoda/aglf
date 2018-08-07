import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, merge } from 'rxjs/operators';
import { Player } from 'app/aglf-classes/player';

@Component({
    selector: 'app-player-selection',
    templateUrl: './player-selection.component.html',
    styleUrls: ['./player-selection.component.scss']
})
export class PlayerSelectionComponent implements OnInit {

    modelTemp: any;
    filterChange: string = '';

    @Input()
    players: Player[] = [];

    filteredPlayers: Player[] = [];

    @Output()
    selectPlayerEventEmitter: EventEmitter<Player> = new EventEmitter<Player>();

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges() {
        this.filteredPlayers = this.players;
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(term => {
                if (term === '') {
                    return [];
                } else {
                    let res = this.players.filter(p => p.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
                    return res;
                }
            }));

    filter(text$: Observable<string>) {
        return text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(term => {
                if (term === '') {
                    return [];
                } else {
                    let res = this.players.filter(p => p.fullName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
                    return res;
                }
            }))
        };

    formatter(result: Player) {
        return result.fullName;
    }

    onPlayerSearchChange(result: Player) {
        if (result) {
            this.selectPlayerEventEmitter.emit(result);
        }
    }

    onPlayerFilterChange(event) {
        this.filteredPlayers = this.players.filter(p => p.fullName.toLowerCase().indexOf(this.filterChange) > -1);
    }

}
