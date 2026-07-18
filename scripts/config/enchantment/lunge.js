import { category, item } from "../helpers";

export default category(
    "Lunge",
    "lunge",
    "minecraft:enchanted_book",
    true,
    false,
    [
        item("Lunge I", "minecraft:enchanted_book", 150, 0, undefined, undefined, [{ id: "lunge", level: 1 }]),
        item("Lunge II", "minecraft:enchanted_book", 350, 0, undefined, undefined, [{ id: "lunge", level: 2 }]),
        item("Lunge III", "minecraft:enchanted_book", 800, 0, undefined, undefined, [{ id: "lunge", level: 3 }]),
    ],
);