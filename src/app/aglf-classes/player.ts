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

export function mapPlayerData(data: any): Player {
    return new Player({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        position: resolvePlayerPosition(data.position),
        positionName: data.position,
        price: data.price,
        team: new Team({
            id: data.teamId,
            name: data.teamName,
            jerseyUrl: data.jerseyUrl
        })
    });
}

export class Player {

    id: number = null;
    firstName: string = null;
    lastName: string = null;
    fullName: string = null;
    photoUrl: string = null;
    position: Position = null;
    positionName: string = null;
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
                positionName: player.positionName || null,
                number: player.number || null,
                price: player.price || null,
                team: player.team || null
            });
        }
    }
}

export class PlayerData {
    id: number = null;
    active: boolean = false;
    captain: boolean = false;
    viceCaptain: boolean = false;

    constructor(data: any) {
        if (data) {
            Object.assign(this, {
                id: data.id || null,
                active: data.active || false,
                captain: data.captain || false,
                viceCaptain: data.viceCaptain || false
            });
        }
    }
}
