import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, merge } from 'rxjs/operators';
import { Player, Position } from 'app/aglf-classes/player';
import { Team } from 'app/aglf-classes/team';
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

    @Input()
    budget: number = 0;

    @Input()
    position: Position | number = 0;

    filteredPlayers: Player[] = [];

    selectedPriceIndex: number = 0;
    priceRange: number[] = Array.apply(null, Array(20)).map((f, i) =>  i === 0 ? -1 : (0.5 + i * 0.5));

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

    teams: Team[] = [];

    constructor() {
        this.playerSelectionForm = new FormGroup({
            fullName: new FormControl(''),
            playersFilter: new FormControl(this.positions[0]),
            priceFilter: new FormControl(this.priceRange[0])
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
            if (values.priceFilter === -1) {
                this.filteredPlayers = this.filteredPlayers.filter(p => p.price > 0);
            } else {
                this.filteredPlayers = this.filteredPlayers.filter(p => p.price <= values.priceFilter).sort((playerA: Player, playerB: Player) => playerB.price - playerA.price);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.players) {
            this.filteredPlayers = this.players;
            this.teams = this.mapTeams(this.filteredPlayers);
        }

        if (changes.position) {
            let position = this.positions.find(p => p.value === this.position);
            this.playerSelectionForm.controls.playersFilter.setValue(position);
        }
    }

    mapTeams(players: Player[]): Team[] {
        let teams: Team[] = [];
        this.players.forEach(player => {
            if (!teams.find(t => t.id === player.team.id)) {
                teams.push(player.team);
            }
        })
        return teams;
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

    selectPlayer(player: Player) {
        if (player) {
            this.selectPlayerEventEmitter.emit(player);
        }
    }
}
