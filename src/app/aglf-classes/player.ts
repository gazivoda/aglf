import { Team } from './team';

export enum Position {
    GOALKEEPER = 1,
    DEFENDER = 2,
    MIDFIELDER = 3,
    STRIKER = 4
}

export function resolvePlayerPosition(position: string): Position {
    switch (position) {
        case 'GOALKEEPER':
            return Position.GOALKEEPER;
        case 'DEFENDER':
            return Position.DEFENDER;
        case 'MIDFILDER':
            return Position.MIDFIELDER;
        case 'STRIKER':
            return Position.STRIKER;
    }
}

export class Player {

    id: number = null;
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
                fullName: player.lastName ? player.firstName + ' ' + player.lastName : player.firstName,
                photoUrl: player.photoUrl || null,
                position: player.position || null,
                number: player.number || null,
                price: player.price || null,
                team: player.team || null
            });
        }
    }
}
