import { world } from '@minecraft/server';

export function getObjectiveMoney() {
    const data = world.getDynamicProperty('drk:obj') ?? 'money'
    return data;
}

export function getCurrency() {
    const data = world.getDynamicProperty('drk:currency') ?? '$'
    return data;
}