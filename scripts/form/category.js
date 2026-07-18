import { categoryManager } from "../config/index";
import { bodyShow } from "../database/bodyShow";
import { getCurrency } from "../database/objective";
import { DarknessFormData } from "../extensions/forms";
import { confirmItem } from "./confirm";

export function openCategory(player, code, back) {
    const category = categoryManager.get(code);
    const form = new DarknessFormData();
    form.title(category.name);
    bodyShow(player, form);
    form.button('§c§s§rBack');
    for (const item of category.items) {
        form.button(`${item.name}\nBuy: §a${getCurrency()}${item.buy}§r | Sell: §c${getCurrency()}${item.sell}`, item.id);
    }
    form.show(player).then(r => {
        if (r.canceled) return;
        if (r.selection === 0) return back(player);
        const selected = category.items[r.selection - 1];
        if (!selected) return;
        confirmItem(player, selected, back, openCategory, code);
    })
}