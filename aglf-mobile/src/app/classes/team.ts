import { Player } from './player';

export class Team {

    id: string = null;
    name: string = null;
    managerName: string = null;
    jerseyUrl: string = null;
    stadium: string = null;
    capacity: number = null;
    players: Player[] = [];

    constructor(team?: any) {
        if (team) {
            Object.assign(this, {
                id: team.id || null,
                name: team.name || null,
                managerName: team.managerName || null,
                jerseyUrl: team.jerseyUrl || null,
                stadium: team.stadium || null,
                capacity: team.capacity || null,
                players: team.players || []
            });
        }
    }
}
