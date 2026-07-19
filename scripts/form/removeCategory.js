import { categoryManager } from '../config/index';
import { DarknessFormData } from '../extensions/forms';

export function removeCategory(player) {
    const category = categoryManager.getAll().filter(x => x.default === false);
    const form = new DarknessFormData();
    form.title('Remove Category');
    form
}