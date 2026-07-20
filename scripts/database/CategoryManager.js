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
            const savedData = JSON.parse(raw);
            if (this.defaultCategories.has(code)) {
                const freshDefaultData = this.categories.get(code);
                const customItems = (Array.isArray(savedData.items) ? savedData.items : [])
                    .filter(item => item.default === false);
                if (!Array.isArray(freshDefaultData.items)) {
                    freshDefaultData.items = [];
                }
                freshDefaultData.items.push(...customItems);
                this.categories.set(code, freshDefaultData);
                
            } else {
                savedData.default = false;
                this.categories.set(code, savedData);
            }
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
        return { status: true, message: `§aAdded §b${data.code} §ato the category list` }
    }
    deleteCategory(code) {
        if (this.defaultCategories.has(code)) {
            return { status: false, message: '§cCannot delete default category' }
        }
        const ct = this.get(code);
        if (!ct) {
            return { status: false, message: '§cCategory not found or already deleted' };
        }
        if (ct.subcategory === true && ct.standalone === true && Array.isArray(ct.items)) {
            for (const item of ct.items) {
                if (!item || !item.code) continue;
                this.deleteCategory(item.code);
            }
        }
        this.categories.delete(code);
        world.setDynamicProperty(`${PREFIX}:${code}`, undefined);
        let index = JSON.parse(
            world.getDynamicProperty(`${PREFIX}:index`) ?? "[]",
        );
        index = index.filter((x) => x !== code);
        world.setDynamicProperty(`${PREFIX}:index`, JSON.stringify(index));
        return { status: true, message: `Removed §b${code} §afrom the category` }
    }
    addItem(categoryCode, data) {
        const category = this.get(categoryCode);
        if (!category) {
            return { status: false, message: '§cCategory not found' };
        }
        if (!category.items || !Array.isArray(category.items)) {
            category.items = [];
        }
        data.default = false;
        category.items.push(data);
        this.saveCustom(category);
        return { status: true, message: `§aItem added to §b${categoryCode}` };
    }
    /**
     * 
     * @param {string} categoryCode
     * @param {string} targetId
     */
    deleteItem(categoryCode, targetId) {
        const category = this.get(categoryCode);
        if (!category) {
            return { status: false, message: '§cCategory not found' };
        }
        if (!category.items || !Array.isArray(category.items)) {
            return { status: false, message: '§cNo items found in this category' };
        }
        const itemIndex = category.items.findIndex((x) => {
            if (category.subcategory === true && category.standalone === true) {
                return x.code === targetId;
            }
            return x.id === targetId;
        });
        if (itemIndex === -1) {
            return { status: false, message: '§cTarget not found in this category'
            };
        }
        if (category.items[itemIndex].default === true) {
            return { status: false, message: '§cCannot delete a default item' };
        }
        if (category.subcategory === true && category.standalone === true) {
            category.items = category.items.filter((x) => x.code !== targetId);
        } else {
            category.items = category.items.filter((x) => x.id !== targetId);
        }
        this.saveCustom(category);
        return { status: true, message: `§aTarget §b${targetId} §aremoved` };
    }
}