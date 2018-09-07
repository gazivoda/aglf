import { Component, OnInit, TemplateRef } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlayersService } from 'app/services/players.service';
import { UserService } from 'app/services/user.service';
import { Player, PlayerData, Position } from 'app/classes/player';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PlayerModalComponent } from '../components/player-modal/player-modal.component';

@Component({
    selector: 'app-team',
    templateUrl: './team.page.html',
    styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

    private _destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    updatePlayerData$: BehaviorSubject<PlayerData> = new BehaviorSubject<PlayerData>(null);

    players: Player[] = [];
    selectedPlayers: Player[] = [];
    budget: number;

    position: Position | number = 0;

    selectedPlayer: Player = null;

    playerRoleForm: FormGroup;

    constructor(private playersService: PlayersService, private userService: UserService, private modalCtrl: ModalController) {
        this.playerRoleForm = new FormGroup({
            id: new FormControl(''),
            active: new FormControl(false),
            captain: new FormControl(false),
            viceCaptain: new FormControl(false)
        });
    }

    ngOnInit() {
        this.userService.getUserDetails()
            .pipe(
                takeUntil(this._destroyed$)
            )
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

        this.updatePlayerData$
            .asObservable()
            .pipe(
                takeUntil(this._destroyed$)
            )
            .subscribe((playerData: PlayerData) => {
                if (playerData) {
                    this.updatePlayerData(playerData);
                }
            });
    }

    ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    updatePlayerData(playerData: PlayerData) {
        if (playerData) {
            this.userService.updatePlayerData(playerData);
        }
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

    openPlayerModalEventHandler(player: Player) {
        this.selectedPlayer = player;
        this.playerRoleForm.controls.id.setValue(player.id);
        this.playerRoleForm.controls.active.setValue(player.active);
        this.playerRoleForm.controls.captain.setValue(player.captain);
        this.playerRoleForm.controls.viceCaptain.setValue(player.viceCaptain);
        this.open();
    }

    open() {
        this.modalCtrl.create({
            component: PlayerModalComponent,
            componentProps: {
                selectedPlayer: this.selectedPlayer,
                playerRoleForm: this.playerRoleForm,
                updatePlayerData: this.updatePlayerData$
            },
            showBackdrop: true
        }).then(modal => modal.present());
    }
}
