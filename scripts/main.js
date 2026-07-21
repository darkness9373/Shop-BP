import { world, system, Player } from '@minecraft/server';
import { mainShop } from './form/main';
import './config/index';
import { openConfig } from './form/configure';

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
    data.customCommandRegistry.registerCommand({
        name: 'drk:shopconfig',
        description: 'Open Shop Configuration (Admin Only)',
        permissionLevel: 0,
        cheatsRequired: false
    }, (origin) => {
        const player = origin.sourceEntity;
        if (!(player instanceof Player)) return;
        if (!player.hasTag('admin')) return player.sendMessage('§cThis command is only for Admin')
        system.run(() => openConfig(player));
    })
})