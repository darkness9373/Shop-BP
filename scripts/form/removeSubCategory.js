import { categoryManager } from "../config/index";
import { DarknessFormData } from "../extensions/forms";

export function removeSubCategory(player, code, sub, back) {
    const parent = categoryManager.get(code);
    const form = new DarknessFormData();
    form.title("Remove Sub Category");
    form.button("§c§s§rBack");
    form.label("Select the sub-category you want to remove");
    for (const list of parent.items.filter(x => x.default === false)) {
        form.button(list.name, list.icon);
    }
    form.show(player).then((r) => {
        if (r.canceled) return;
        if (r.selection === 0) return sub(player, code, back);
        const selected = parent.items.filter(x => x.default === false)[r.selection - 1];
        if (!selected) return;
        const remove = categoryManager.deleteCategory(selected.code);
        const removeItem = categoryManager.deleteItem(code, selected.code);
        if (remove.status === false) {
            return player.sendMessage(remove.message);
        }
        if (removeItem.status === false) {
            return player.sendMessage(removeItem.message);
        }
        player.sendMessage(remove.message);
    });
}
