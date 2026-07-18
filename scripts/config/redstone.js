import { category, item } from "./helpers";

export default category(
    "Redstone",
    "redstone",
    "minecraft:redstone_block",
    false,
    true,
    [
        item("Redstone Dust", "minecraft:redstone", 8, 4),
        item("Redstone Torch", "minecraft:redstone_torch", 12, 6),
        item("Redstone Block", "minecraft:redstone_block", 70, 35),
        item("Piston", "minecraft:piston", 25, 12),
        item("Sticky Piston", "minecraft:sticky_piston", 35, 18),
        item("Redstone Repeater", "minecraft:repeater", 30, 15),
        item("Redstone Comparator", "minecraft:comparator", 45, 22),
        item("Observer", "minecraft:observer", 60, 30),
        item("Dispenser", "minecraft:dispenser", 40, 20),
        item("Dropper", "minecraft:dropper", 20, 10),
        item("Hopper", "minecraft:hopper", 80, 40),
        item("Target Block", "minecraft:target", 15, 7),
    ],
);