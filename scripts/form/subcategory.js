import { categoryManager } from "../config/index";
import { bodyShow } from "../database/bodyShow";
import { getCurrency } from "../database/objective";
import { DarknessFormData } from "../extensions/forms";
import { confirmItemSub } from "./confirmSub";

export function openSubCategory(player, code, back) {
    const subcategory = categoryManager.get(code);
    let allSub = [];
    const form = new DarknessFormData();
    form.title(subcategory.name);
    bodyShow(player, form);
    form.button('§c§s§rBack');
    for (const item of subcategory.items) {
        form.button(item.name, item.icon);
        allSub.push(item.code);
    }
    form.show(player).then(r => {
        if (r.canceled) return;
        if (r.selection === 0) return back(player);
        const selected = categoryManager.get(allSub[r.selection - 1]);
        if (!selected) return;
        openFromSub(player, selected.code, code, back)
    })
}

function openFromSub(player, code, sub, back) {
    const category = categoryManager.get(code);
    const form = new DarknessFormData();
    form.title(category.name);
    bodyShow(player, form);
    form.button('§c§s§rBack');
    for (const item of category.items) {
        form.button(`${item.name}\nBuy: §a${getCurrency()}${item.buy} §r| Sell: §c${getCurrency()}${item.sell}`, item.id);
    }
    form.show(player).then(r => {
        if (r.canceled) return;
        if (r.selection === 0) return openSubCategory(player, sub, back);
        const selected = category.items[r.selection - 1];
        confirmItemSub(player, selected, back, openFromSub, code, sub);
    })
}