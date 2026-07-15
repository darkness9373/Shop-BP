import { world, system, Player } from '@minecraft/server';
import { mainShop } from './form/main';

system.beforeEvents.startup.subscribe(data => {
    data.customCommandRegistry.registerCommand({
        name: 'drk:shop',
        description: 'Open Shop',
        permissionLevel: 0,
        cheatsRequired: false
    }, (origin) => {
        const player = origin.sourceEntity;
        if (!(player instanceof Player)) return;
        system.run(() => mainShop(player));
    })
})