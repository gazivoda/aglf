import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayersService } from 'app/aglf-services/players.service';
import { UserService } from 'app/aglf-services/user.service';
import { Player, Position, PlayerData } from 'app/aglf-classes/player';
import { FormGroup, FormControl } from '@angular/forms';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-team-overview',
    templateUrl: './team-overview.component.html',
    styleUrls: ['./team-overview.component.scss']
})
export class TeamOverviewComponent implements OnInit {

    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    players: Player[] = [];
    selectedPlayers: Player[] = [];
    budget: number;

    position: Position | number = 0;

    selectedPlayer: Player = null;

    playerRoleForm: FormGroup;

    constructor(private playersService: PlayersService, private userService: UserService, private modalService: NgbModal) {
        this.playerRoleForm = new FormGroup({
            id: new FormControl(''),
            active: new FormControl(false),
            captain: new FormControl(false),
            viceCaptain: new FormControl(false)
        });
    }

    ngOnInit() {
        this.userService.getUserDetails()
            .subscribe((data: any) => {
                let selectedPlayers = data.players;
                this.userService.setSelectedPlayers(selectedPlayers);
            });

        this.playersService.getPlayers()
            .pipe(
                takeUntil(this._destroyed$)
            )
            .subscribe((players: Player[]) => {
                this.players = players;

                if (players.length > 0) {
                    let prices = players.map(player => player.price).filter(p => p !== null);
                    console.log(Math.max(...prices), Math.min(...prices));
                }
            });

        this.userService.getSelectedPlayers()
            .pipe(
                takeUntil(this._destroyed$)
            )
            .subscribe((selectedPlayers: Player[]) => {
                this.selectedPlayers = selectedPlayers;
            });

        this.userService.getBudget()
            .pipe(
                takeUntil(this._destroyed$)
            )
            .subscribe((budget: number) => {
                this.budget = budget;
            });

        this.playerRoleForm.controls.captain.valueChanges
            .pipe(
                takeUntil(this._destroyed$)
            )
            .subscribe((isCaptain: boolean) => {
                if (isCaptain) {
                    this.playerRoleForm.controls.viceCaptain.setValue(false);
                }
            });
        this.playerRoleForm.controls.viceCaptain.valueChanges
            .pipe(
                takeUntil(this._destroyed$)
            )
            .subscribe((isViceCaptain: boolean) => {
                if (isViceCaptain) {
                    this.playerRoleForm.controls.captain.setValue(false);
                }
            });
    }

    ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    selectPlayerEventHandler(player: Player) {
        if (player instanceof Player) {
            this.userService.addPlayer(player, true);
        }
    }

    removePlayerEventHandler(player: Player) {
        this.userService.removePlayer(player);
    }

    selectPositionEventHandler(position: Position) {
        this.position = position;
    }

    openPlayerModalEventHandler(player: Player, content: TemplateRef<NgbModal>) {
        this.selectedPlayer = player;
        this.playerRoleForm.controls.id.setValue(player.id);
        this.playerRoleForm.controls.active.setValue(player.active);
        this.playerRoleForm.controls.captain.setValue(player.captain);
        this.playerRoleForm.controls.viceCaptain.setValue(player.viceCaptain);
        this.open(content);
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            let playerData: PlayerData = <PlayerData>this.playerRoleForm.value;
            this.userService.updatePlayerData(playerData);
        }, (reason) => {
            console.log('modal closed');
        });
    }
}
