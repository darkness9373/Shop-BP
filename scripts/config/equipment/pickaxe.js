import { category, item } from "../helpers";

export default category(
    "Pickaxe",
    "pickaxe",
    "minecraft:diamond_pickaxe",
    true,
    false,
    [
        item("Wooden Pickaxe", "minecraft:wooden_pickaxe", 15, 0),
        item("Stone Pickaxe", "minecraft:stone_pickaxe", 30, 0),
        item("Copper Pickaxe", "minecraft:copper_pickaxe", 60, 0),
        item("Iron Pickaxe", "minecraft:iron_pickaxe", 120, 0),
        item("Golden Pickaxe", "minecraft:golden_pickaxe", 180, 0),
        item("Diamond Pickaxe", "minecraft:diamond_pickaxe", 600, 0),
        item("Netherite Pickaxe", "minecraft:netherite_pickaxe", 2500, 0),
    ],
);
