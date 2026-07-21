import { categoryManager } from "../config/index";
import { getCurrency } from "../database/objective";
import { DarknessFormData } from "../extensions/forms";

export function removeItem(player, code, back, frm, sub) {
    const category = categoryManager.get(code);
    const items = category.items.filter((x) => x.default === false);
    const form = new DarknessFormData();
    form.title("Remove Item");
    form.button("§c§s§rBack");
    for (const item of items) {
        form.button(
            `${item.name}\nBuy: §a${getCurrency()}${item.buy} §r| Sell: §c${getCurrency()}${item.sell}`,
            item.id,
        );
    }
    form.show(player).then((r) => {
        if (r.canceled) return;
        if (r.selection === 0) {
            if (!sub) {
                frm(player, code, back);
            } else {
                frm(player, code, sub, back);
            }
        }
        const selected = items[r.selection - 1];
        if (!selected) return;
        const remove = categoryManager.deleteItem(code, selected.id);
        if (!remove.status) return player.sendMessage(remove.message);
        player.sendMessage(remove.message);
    });
}
