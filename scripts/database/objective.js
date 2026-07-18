import { world } from '@minecraft/server';

export function getObjectiveMoney() {
    const data = world.getDynamicProperty('drk:obj')
    let input;
    if (!data) input = 'money';
    else input = data;
    return input;
}

export function getCurrency() {
    const data = world.getDynamicProperty('drk:currency') ?? '$'
    return data;
}

export function checkObjective(obj) {
    const ch = world.scoreboard.getObjective(obj);
    if (!ch) {
        world.scoreboard.addObjective(obj);
    }
    return obj;
}