import { DarknessFormData } from "../extensions/forms";
import { world } from "@minecraft/server";
import { openCategory } from "./category";
import { bodyShow } from "../database/bodyShow";
import { categoryManager } from "../config/index";
import { openSubCategory } from "./subcategory";
import { addCategory } from "./addCategory";
import { removeCategory } from './removeCategory';

export function mainShop(player) {
    const categories = categoryManager.getAll().filter(x => x.standalone === true);
    const form = new DarknessFormData();
    form.title("Shop");
    bodyShow(player, form);
    for (const category of categories) {
        form.button(category.name, category.icon);
    }
    if (player.hasTag('admin')) {
        const added = categories.filter(x => x.default === false);
        form.button('Add Category', 'textures/ui/color_plus');
        if (added.length > 0) {
            form.button('Remove Category', 'textures/ui/icon_trash');
        }
    }
    form.show(player).then((r) => {
        if (r.canceled) return;
        if (player.hasTag('admin')) {
            if (r.selection === categories.length) return addCategory(player);
            if (r.selection === categories.length + 1)
                return removeCategory(player, mainShop)
        }
        const selected = categories[r.selection];
        if (!selected) return;
        if (selected.subcategory === false) {
            return openCategory(player, selected.code, mainShop);
        } else {
            return openSubCategory(player, selected.code, mainShop);
        }
    });
}
