import { world } from "@minecraft/server";
import { checkObjective, getObjectiveMoney } from "./objective.js";

export function getMoney(player) {
    const obj = getObjectiveMoney();
    const check = checkObjective(obj);
    let score;
    try {
        score = world.scoreboard.getObjective(check).getScore(player);
    } catch {
        player.dimension.runCommand(
            `scoreboard players set ${player.name} ${check} 0`,
        );
        score = world.scoreboard.getObjective(check).getScore(player);
    }
    if (score === undefined) {
        player.dimension.runCommand(
            `scoreboard players set ${player.name} ${check} 0`,
        );
        score = world.scoreboard.getObjective(check).getScore(player);
    }
    return score;
}

export function addMoney(player, amount) {
    const obj = getObjectiveMoney();
    const check = checkObjective(obj);
    getMoney(player);
    world.scoreboard.getObjective(check).addScore(player, amount);
}
