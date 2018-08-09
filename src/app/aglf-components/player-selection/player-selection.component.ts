import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, merge } from 'rxjs/operators';
import { Player, Position } from 'app/aglf-classes/player';
import { FormGroup, FormControl } from '@angular/forms';

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

    playerSelectionForm: FormGroup;

    selectedIndex: number = 0;
    selectedValue: number = 0;
    positions = [{
        name: 'All players',
        value: 0
    }, {
        name: 'Goalkeepers',
        value: Position.GOALKEEPER
    }, {
        name: 'Defenders',
        value: Position.DEFENDER
    }, {
        name: 'Midfielders',
        value: Position.MIDFIELDER
    }, {
        name: 'Strikers',
        value: Position.STRIKER
    }];

    teams = [{
        name: 'Juve',
        id: 1
    }, {
        name: 'PSG',
        id: 2
    }, {
        name: 'R. Madrid',
        id: 3
    }];

    constructor() {
        this.playerSelectionForm = new FormGroup({
            fullName: new FormControl(''),
            playersFilter: new FormControl(this.positions[0])
        });
    }

    ngOnInit() {
        this.playerSelectionForm.valueChanges.subscribe(values => {
            if (values.playersFilter.id === undefined) {
                if (values.playersFilter.value === 0) {
                    this.filteredPlayers = this.players.filter(p => p.fullName.toLowerCase().indexOf(values.fullName.toLowerCase()) > -1);
                } else {
                    this.filteredPlayers = this.players.filter(p => ((p.fullName.toLowerCase().indexOf(values.fullName.toLowerCase()) > -1) && p.position === values.playersFilter.value));
                }
            } else {
                this.filteredPlayers = this.players.filter(p => ((p.fullName.toLowerCase().indexOf(values.fullName.toLowerCase()) > -1) && p.team.id === values.playersFilter.id));
            }
        });
    }

    ngOnChanges() {
        this.filteredPlayers = this.players;
        this.filteredPlayers.sort((p1, p2) => {
            if (p1.price > p2.price) {
                return 1;
            } else if (p1.price < p2.price) {
                return -1;
            } else {
                return 0;
            }
        });

        let teams = [];
        this.players.forEach(player => {
            if (!teams.find(t => t.id === player.team.id)) {
                teams.push(player.team);
            }
        })
        this.teams = teams;
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
}
