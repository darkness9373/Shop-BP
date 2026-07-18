import { category, item } from "../helpers";

export default category(
    "Efficiency",
    "efficiency",
    "minecraft:enchanted_book",
    true,
    false,
    [
        item("Efficiency I", "minecraft:enchanted_book", 40, 0, undefined, undefined, [{ id: "efficiency", level: 1 }]),
        item("Efficiency II", "minecraft:enchanted_book", 100, 0, undefined, undefined, [{ id: "efficiency", level: 2 }]),
        item("Efficiency III", "minecraft:enchanted_book", 250, 0, undefined, undefined, [{ id: "efficiency", level: 3 }]),
        item("Efficiency IV", "minecraft:enchanted_book", 550, 0, undefined, undefined, [{ id: "efficiency", level: 4 }]),
        item("Efficiency V", "minecraft:enchanted_book", 1200, 0, undefined, undefined, [{ id: "efficiency", level: 5 }]),
    ],
);