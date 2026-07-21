import { categoryManager } from "../config/index";
import { bodyShow } from "../database/bodyShow";
import { getCurrency } from "../database/objective";
import { DarknessFormData } from "../extensions/forms";
import { addItem } from "./addItem";
import { confirmItem } from "./confirm";
import { removeItem } from "./removeItem";

export function openCategory(player, code, back) {
    const category = categoryManager.get(code);
    const form = new DarknessFormData();
    form.title(category.name);
    bodyShow(player, form);
    form.button('§c§s§rBack');
    for (const item of category.items) {
        form.button(`${item.name}\nBuy: §a${getCurrency()}${item.buy}§r | Sell: §c${getCurrency()}${item.sell}`, item.id);
    }
    if (player.hasTag('admin')) {
        form.button('Add Item', 'textures/ui/color_plus');
        if (category.items.filter(x => x.default === false).length > 0) {
            form.button('Remove Item', 'textures/ui/icon_trash')
        }
    }
    form.show(player).then(r => {
        if (r.canceled) return;
        if (r.selection === 0) return back(player);
        if (r.selection === category.items.length + 1) return addItem(player, code, back, openCategory);
        if (r.selection === category.items.length + 2) return removeItem(player, code, back, openCategory);
        const selected = category.items[r.selection - 1];
        if (!selected) return;
        confirmItem(player, selected, back, openCategory, code);
    })
}