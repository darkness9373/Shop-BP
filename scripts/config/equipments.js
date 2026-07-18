import { category, itemSub } from "./helpers";

export default category(
    "Equipment",
    "equipment",
    "minecraft:diamond_sword",
    true,
    true,
    [
        itemSub("Sword", "sword", "minecraft:diamond_sword"),
        itemSub("Pickaxe", "pickaxe", "minecraft:diamond_pickaxe"),
        itemSub("Axe", "axe", "minecraft:diamond_axe"),
    ],
);
