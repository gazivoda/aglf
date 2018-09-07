import { Component, OnInit, Input, Output } from '@angular/core';
import { PlayerData } from 'app/classes/player';
import { BehaviorSubject } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-player-modal',
    templateUrl: './player-modal.component.html',
    styleUrls: ['./player-modal.component.scss']
})
export class PlayerModalComponent implements OnInit {

    @Input()
    selectedPlayer: Player;

    @Input()
    playerRoleForm: any;

    @Input()
    updatePlayerData: BehaviorSubject<PlayerData>;

    constructor(public modalCtrl: ModalController) {
    }

    ngOnInit() {
    }

    dismiss(save: boolean) {
        if (save === true) {
            this.updatePlayerData.next(this.playerRoleForm.value);
        } else {
            this.updatePlayerData.next(null);
        }
        this.modalCtrl.dismiss();
    }
}
