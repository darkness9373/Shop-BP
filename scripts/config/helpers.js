export function item(name, id, buy, sell, nameTag, lore, enchant, defaultItem = true) {
    return {
        name,
        id,
        buy,
        sell,
        nameTag,
        lore,
        enchant,
        default: defaultItem,
    };
}

export function category(name, code, icon, subcategory = false, standalone = true, items) {
    return {
        name,
        code,
        icon,
        subcategory,
        standalone,
        items,
    };
}

export function itemSub(name, code, icon) {
    return {
        name,
        code,
        icon,
    };
}
