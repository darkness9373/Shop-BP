import { world } from '@minecraft/server';
import { getObjectiveMoney } from './objective.js'

export function getMoney(player) {
    return world.scoreboard.getObjective(getObjectiveMoney()).getScore(player) ?? 0;
}