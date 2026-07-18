import { category, itemSub } from "./helpers";

export default category(
    "Enchantments",
    "enchantments",
    "minecraft:enchanted_book",
    true,
    true,
    [
        itemSub("Sharpness", "sharpness", "minecraft:enchanted_book"),
        itemSub("Looting", "looting", "minecraft:enchanted_book"),
        itemSub("Unbreaking", "unbreaking", "minecraft:enchanted_book"),
        itemSub("Mending", "mending", "minecraft:enchanted_book"),
        itemSub("Protection", "protection", "minecraft:enchanted_book"),
        itemSub("Flame", "flame", "minecraft:enchanted_book"),
        itemSub("Efficiency", "efficiency", "minecraft:enchanted_book"),
        itemSub("Silk Touch", "silk_touch", "minecraft:enchanted_book"),
        itemSub("Lunge", "lunge", "minecraft:enchanted_book"),
        itemSub("Multishot", "multishot", "minecraft:enchanted_book"),
    ],
);