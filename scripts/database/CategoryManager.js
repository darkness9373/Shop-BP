import { world } from "@minecraft/server";
const PREFIX = "category_custom";

export class CategoryManager {
    constructor() {
        this.categories = new Map();
        this.defaultCategories = new Set();
    }
    /**
     * Load all default category
     */
    loadDefault(categories) {
        for (const data of categories) {
            data.default = true;
            this.categories.set(data.code, data);
            this.defaultCategories.add(data.code);
        }
    }
    /**
     * Load all custom category
     */
    loadCustom() {
        const index = JSON.parse(
            world.getDynamicProperty(`${PREFIX}:index`) ?? "[]",
        );
        for (const code of index) {
            const raw = world.getDynamicProperty(`${PREFIX}:${code}`);
            if (!raw) continue;
            const data = JSON.parse(raw);
            data.default = false;
            this.categories.set(code, data);
        }
    }
    /**
     * Save custom category
     */
    saveCustom(data) {
        world.setDynamicProperty(
            `${PREFIX}:${data.code}`,
            JSON.stringify(data),
        );
        let index = JSON.parse(
            world.getDynamicProperty(`${PREFIX}:index`) ?? "[]",
        );
        if (!index.includes(data.code)) {
            index.push(data.code);
        }
        world.setDynamicProperty(`${PREFIX}:index`, JSON.stringify(index));
    }
    /**
     * Get category
     */
    get(code) {
        return this.categories.get(code);
    }
    getAll() {
        return [...this.categories.values()];
    }
    addCategory(data) {
        if (this.categories.has(data.code)) {
            return { status: false, message: '§cCategory already exist' }
        }
        data.default = false;
        this.categories.set(data.code, data);
        this.saveCustom(data);
    }
    deleteCategory(code) {
        if (this.defaultCategories.has(code)) {
            throw new Error("Cannot delete default category");
        }
        this.categories.delete(code);
        world.setDynamicProperty(`${PREFIX}:${code}`, undefined);
        let index = JSON.parse(
            world.getDynamicProperty(`${PREFIX}:index`) ?? "[]",
        );
        index = index.filter((x) => x !== code);
        world.setDynamicProperty(`${PREFIX}:index`, JSON.stringify(index));
    }
    addItem(categoryCode, data) {
        const category = this.get(categoryCode);
        if (!category) throw new Error("Category not found");
        category.items.push(data);
        if (!category.default) {
            this.saveCustom(category);
        }
    }
    deleteItem(categoryCode, data) {
        const category = this.get(categoryCode);
        if (!category) throw new Error("Category not found");
        const item = category.items.find((x) => x === data);
        if (!item) return;
        if (item.default) throw new Error("Cannot delete default item");
        category.items = category.items.filter((x) => x !== data);
        if (!category.default) {
            this.saveCustom(category);
        }
    }
}
