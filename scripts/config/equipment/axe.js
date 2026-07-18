import { category, item } from "../helpers";

export default category(
    "Axe",
    "axe",
    "minecraft:diamond_axe",
    true,
    false,
    [
        item("Wooden Axe", "minecraft:wooden_axe", 15, 0),
        item("Stone Axe", "minecraft:stone_axe", 30, 0),
        item("Copper Axe", "minecraft:copper_axe", 60, 0),
        item("Iron Axe", "minecraft:iron_axe", 120, 0),
        item("Golden Axe", "minecraft:golden_axe", 180, 0),
        item("Diamond Axe", "minecraft:diamond_axe", 600, 0),
        item("Netherite Axe", "minecraft:netherite_axe", 2500, 0),
    ],
);