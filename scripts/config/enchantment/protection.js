import { category, item } from "../helpers";

export default category(
    "Protection",
    "protection",
    "minecraft:enchanted_book",
    true,
    false,
    [
        item("Protection I", "minecraft:enchanted_book", 60, 0, undefined, undefined, [{ id: "protection", level: 1 }]),
        item("Protection II", "minecraft:enchanted_book", 150, 0, undefined, undefined, [{ id: "protection", level: 2 }]),
        item("Protection III", "minecraft:enchanted_book", 350, 0, undefined, undefined, [{ id: "protection", level: 3 }]),
        item("Protection IV", "minecraft:enchanted_book", 800, 0, undefined, undefined, [{ id: "protection", level: 4 }]),
    ],
);