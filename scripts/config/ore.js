import { category, item } from "./helpers";

export default category(
    "Ore",
    "ore",
    "minecraft:diamond",
    false,
    true,
    [
        item("Coal", "minecraft:coal", 5, 2),
        item("Raw Iron", "minecraft:raw_iron", 15, 7),
        item("Iron Ingot", "minecraft:iron_ingot", 20, 10),
        item("Raw Copper", "minecraft:raw_copper", 8, 4),
        item("Copper Ingot", "minecraft:copper_ingot", 12, 6),
        item("Raw Gold", "minecraft:raw_gold", 30, 15),
        item("Gold Ingot", "minecraft:gold_ingot", 40, 20),
        item("Lapis Lazuli", "minecraft:lapis_lazuli", 15, 7),
        item("Redstone Dust", "minecraft:redstone", 8, 4),
        item("Diamond", "minecraft:diamond", 150, 75),
        item("Emerald", "minecraft:emerald", 100, 50),
        item("Nether Quartz", "minecraft:quartz", 25, 12),
        item("Netherite Scrap", "minecraft:netherite_scrap", 400, 200),
        item("Netherite Ingot", "minecraft:netherite_ingot", 1800, 900),
    ],
);