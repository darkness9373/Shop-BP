import { category, item } from "../helpers";

export default category(
    "Sword",
    "sword",
    "minecraft:diamond_sword",
    true,
    false,
    [
        item("Wooden Sword", "minecraft:wooden_sword", 15, 0),
        item("Stone Sword", "minecraft:stone_sword", 30, 0),
        item("Copper Sword", "minecraft:copper_sword", 60, 0),
        item("Iron Sword", "minecraft:iron_sword", 120, 0),
        item("Golden Sword", "minecraft:golden_sword", 180, 0),
        item("Diamond Sword", "minecraft:diamond_sword", 600, 0),
        item("Netherite Sword", "minecraft:netherite_sword", 2500, 0),
    ],
);
