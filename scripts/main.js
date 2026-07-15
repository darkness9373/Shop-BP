import { world, system, Player } from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';
import { DarknessFormData } from './extensions/forms';

system.beforeEvents.startup.subscribe(data => {
    data.customCommandRegistry.registerCommand({
        name: 'drk:normal',
        description: 'Open normal form',
        permissionLevel: 0,
        cheatsRequired: false
    }, (origin) => {
        const player = origin.sourceEntity;
        if (!(player instanceof Player)) return;
        system.run(() => normalForm(player));
    })
    data.customCommandRegistry.registerCommand({
        name: 'drk:custom',
        description: 'Open custom form',
        permissionLevel: 0,
        cheatsRequired: false
    }, (origin) => {
        const player = origin.sourceEntity;
        if (!(player instanceof Player)) return;
        system.run(() => customForm(player));
    })
})

function normalForm(player) {
    const form = new ActionFormData()
    form.title('Normal Button');
    form.button('Prev');
    form.button('Next');
    form.button('Refresh');
    form.button('Button 1');
    form.button('Button 2');
    form.button('Button 3');
    form.button('Button 4');
    form.show(player).then(r => {
        if (r.canceled) return;
        player.sendMessage(`${r.selection}`);
    })
}

function customForm(player) {
    const form = new DarknessFormData()
    form.title('Custom Button');
    form.body('$100');
    form.button('§c§s§rBack');
    form.button('Button 1\nTest\nTest\nTest');
    form.button('Button 2', 'textures/blocks/diamond_block');
    form.button('Button 3');
    form.button('Button 4', 'minecraft:nether_star');
    form.show(player).then(r => {
        if (r.canceled) return player.sendMessage(`Closed`);
        player.sendMessage(`${r.selection}`);
    })
}