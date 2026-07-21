import { categoryManager } from '../config/index';
import { DarknessFormData } from '../extensions/forms';

export function removeCategory(player, back) {
    const category = categoryManager.getAll().filter(x => x.default === false && x.standalone === true);
    const form = new DarknessFormData();
    form.title('Remove Category');
    form.button('§c§s§rBack');
    form.label('Select the category you want to remove');
    for (const list of category) {
        form.button(list.name, list.icon);
    }
    form.show(player).then(r => {
        if (r.canceled) return;
        if (r.selection === 0) return back(player);
        const selected = category[r.selection - 1];
        if (!selected) return;
        const remove = categoryManager.deleteCategory(selected.code);
        if (remove.status === false) {
            return player.sendMessage(remove.message);
        }
        player.sendMessage(remove.message);
    })
}