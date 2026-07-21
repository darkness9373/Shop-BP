import { categoryManager } from "../config/index";
import { bodyShow } from "../database/bodyShow";
import { getCurrency } from "../database/objective";
import { DarknessFormData } from "../extensions/forms";
import { addItem } from "./addItem";
import { addSubCategory } from "./addSubCategory";
import { confirmItemSub } from "./confirmSub";
import { removeItem } from "./removeItem";
import { removeSubCategory } from "./removeSubCategory";

export function openSubCategory(player, code, back) {
    const subcategory = categoryManager.get(code);
    let allSub = [];
    const form = new DarknessFormData();
    form.title(subcategory.name);
    bodyShow(player, form);
    form.button("§c§s§rBack");
    for (const item of subcategory.items) {
        form.button(item.name, item.icon);
        allSub.push(item.code);
    }
    if (player.hasTag("admin")) {
        form.button("Add Sub Category", "textures/ui/color_plus");
        const ls = subcategory.items;
        if (ls.length > 0) {
            form.button("Remove Sub Category", "textures/ui/icon_trash");
        }
    }
    form.show(player).then((r) => {
        if (r.canceled) return;
        if (r.selection === 0) return back(player);
        if (player.hasTag("admin")) {
            if (r.selection === subcategory.items.length + 1) {
                return addSubCategory(player, code);
            }
            if (r.selection === subcategory.items.length + 2) {
                return removeSubCategory(player, code, openSubCategory, back);
            }
        }
        const selected = categoryManager.get(allSub[r.selection - 1]);
        if (!selected) return;
        openFromSub(player, selected.code, code, back);
    });
}

function openFromSub(player, code, sub, back) {
    const category = categoryManager.get(code);
    const form = new DarknessFormData();
    form.title(category.name);
    bodyShow(player, form);
    form.button("§c§s§rBack");
    for (const item of category.items) {
        form.button(
            `${item.name}\nBuy: §a${getCurrency()}${item.buy} §r| Sell: §c${getCurrency()}${item.sell}`,
            item.id,
        );
    }
    if (player.hasTag("admin")) {
        form.button("Add Item", "textures/ui/color_plus");
        if (category.items.filter(x => x.default === false).length > 0) {
            form.button("Remove Item", "textures/ui/icon_trash");
        }
    }
    form.show(player).then((r) => {
        if (r.canceled) return;
        if (r.selection === 0) return openSubCategory(player, sub, back);
        if (r.selection === category.items.length + 1)
            return addItem(player, code, back, openFromSub, sub);
        if (r.selection === category.items.length + 2)
            return removeItem(player, code, back, openFromSub, sub);
        const selected = category.items[r.selection - 1];
        if (!selected) return;
        confirmItemSub(player, selected, back, openFromSub, code, sub);
    });
}
