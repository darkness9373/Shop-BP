import { EnchantmentType, ItemStack, Player } from "@minecraft/server";
import { ObservableBoolean, ObservableString } from "@minecraft/server-ui";
import { output } from "../config/output";
import { shopConfig } from "../config/shop";
import { addMoney, getMoney } from "../database/money";
import { getCurrency } from "../database/objective";

/**
 * @typedef {Object} ItemEnchant
 * @property {string} id
 * @property {number} level
 */

/**
 * @typedef {Object} BuyItemData
 * @property {string} id
 * @property {string} nameTag
 * @property {ItemEnchant[]} enchant
 * @property {string[]} lore
 * @property {number} amount
 */

/**
 * @typedef {Object} Items
 * @property {string} name
 * @property {string} id
 * @property {string} nameTag
 * @property {ItemEnchant[]} enchant
 * @property {string[]} lore
 * @property {number} buy
 * @property {number} sell
 * @property {boolean} default
 */

/**
 * @typedef {Object} UpdateForm
 * @property {ObservableString} qtInput
 * @property {ObservableString} outLabel
 * @property {ObservableBoolean} toggleInput
 * @property {Function} updateDynamic
 */

/**
 *
 * @param {Player} player
 * @param {Items} item
 * @param {UpdateForm} update
 */
export function confirmRun(player, item, update) {
    const MAX_LENGTH = 22;
    const qt = Number(update.qtInput.getData());
    if (isNaN(qt)) {
        return update.outLabel.setData(output.failed.qtyinvalid);
    }
    if (qt > shopConfig.MAX_ITEM_AMOUNT)
        return update.outLabel.setData(output.failed.qtymax);
    if (qt === 0) return update.outLabel.setData(output.failed.qtyzero);
    const totalBuy = qt * item.buy;
    const totalSell = qt * item.sell;
    if (update.toggleInput.getData() === true) {
        // Buy
        if (getMoney(player) < totalBuy) {
            return update.outLabel.setData(output.failed.nomoney);
        }
        const success = buyItem(player, {
            id: item.id,
            amount: qt,
            enchant: item.enchant,
            lore: item.lore,
            nameTag: item.nameTag
        });
        if (!success) {
            return update.outLabel.setData(output.failed.nospace);
        }
        addMoney(player, -totalBuy);
        update.outLabel.setData(output.success.buy(update.qtInput, item));
        update.updateDynamic()
    } else {
        // Sell
        if (item.sell <= 0) {
            return update.outLabel.setData(output.failed.nosell);
        }
        const success = sellItem(player, item.id, qt);
        if (!success) {
            return update.outLabel.setData(output.failed.noitem);
        }
        addMoney(player, totalSell);
        update.outLabel.setData(output.success.sell(update.qtInput, item));
        update.updateDynamic();
    }
}

/**
 *
 * @param {Player} player
 * @param {string} typeId
 * @param {number} amount
 */
function sellItem(player, typeId, amount, enchanted_book) {
    const container = player.getComponent("inventory").container;
    let total = 0;
    for (let i = 0; i < container.size; i++) {
        const item = container.getItem(i);
        if (!item || item.typeId !== typeId) continue;
        total += item.amount;
    }
    if (total < amount) {
        return false;
    }
    let remaining = amount;
    for (let i = 0; i < container.size && remaining > 0; i++) {
        const item = container.getItem(i);
        if (!item || item.typeId !== typeId) continue;
        if (item.amount <= remaining) {
            remaining -= item.amount;
            container.setItem(i);
        } else {
            item.amount -= remaining;
            container.setItem(i, item);
            remaining = 0;
        }
    }
    return true;
}

/**
 *
 * @param {Player} player
 * @param {BuyItemData} itemData
 */
function buyItem(player, itemData) {
    if (!canAddItem(player, itemData)) return false;
    const container = player.getComponent("inventory").container;
    let remaining = itemData.amount;
    while (remaining > 0) {
        const item = new ItemStack(itemData.id);
        if (itemData.nameTag?.length > 0) item.nameTag = itemData.nameTag;
        if (itemData.lore?.length > 0) item.setLore(itemData.lore);
        if (itemData.enchant?.length > 0) {
            const enchantable = item.getComponent("enchantable");
            if (enchantable) {
                for (const enc of itemData.enchant) {
                    const encType = new EnchantmentType(enc.id);
                    enchantable.addEnchantment({
                        level: enc.level,
                        type: encType,
                    });
                }
            }
        }
        item.amount = Math.min(item.maxAmount, remaining);
        container.addItem(item);
        remaining -= item.amount;
    }
    return true;
}

/**
 *
 * @param {Player} player
 * @param {BuyItemData} itemData
 */
function canAddItem(player, itemData) {
    const container = player.getComponent("inventory").container;
    const sample = new ItemStack(itemData.id);
    const maxStack = sample.maxAmount;
    let capacity = 0;
    for (let i = 0; i < container.size; i++) {
        const item = container.getItem(i);
        if (!item) {
            capacity += maxStack;
        } else if (item.typeId === itemData.id && item.amount < item.maxAmount) {
            capacity += item.maxAmount - item.amount;
        }
        if (capacity >= itemData.amount) {
            return true;
        }
    }
    return false;
}
