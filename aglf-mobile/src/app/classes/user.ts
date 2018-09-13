import { Player } from './player';

export class User {

    id: string = null;
    username: string = null;
    token: string = null;
    tokenValidUntil: number = null;
    budget: number = null;
    score: number = null;
    userPlayers: Player[] = [];

    constructor(user?: any) {
        if (user) {
            Object.assign(this, {
                id: user.id || null,
                username: user.username || null,
                token: user.token || null,
                tokenValidUntil: user.tokenValidUntil || null,
                budget: user.budget || null,
                score: user.score || null,
                userPlayers: user.userPlayers || []
            });
        }
    }
}
