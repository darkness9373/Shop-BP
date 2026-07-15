import { DarknessFormData } from '../extensions/forms';
import { getCurrency, getObjectiveMoney } from '../database/objective';
import { world } from '@minecraft/server';
import { getMoney } from '../database/money'

export function mainShop(player) {
    const curr = getCurrency();
    const mon = getMoney(player);
    const form = new DarknessFormData();
    form.title('Shop');
    form.body(`${curr}${mon}`)
    form.button('Test');
    form.show(player)
}