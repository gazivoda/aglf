import { Team } from './team';

export enum Position {
    GOALKEEPER = 1,
    DEFENDER = 2,
    MIDFILDER = 3,
    STRIKER = 4
}

export class Player {

    id: string = null;
    firstName: string = null;
    lastName: string = null;
    fullName: string = null;
    photoUrl: string = null;
    position: Position = null;
    number: number = null;
    price: number = null;
    team: Team = null;

    constructor(player?: any) {
        if (player) {
            Object.assign(this, {
                id: player.id || null,
                firstName: player.firstName || null,
                lastName: player.lastName || null,
                fullName: player.firstName && player.lastName ? player.firstName + ' ' + player.lastName : null,
                photoUrl: player.photoUrl || null,
                position: player.position || null,
                number: player.number || null,
                price: player.price || null,
                team: player.team || null
            });
        }
    }
}
