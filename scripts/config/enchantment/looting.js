import { category, item } from "../helpers";

export default category(
    "Looting",
    "looting",
    "minecraft:enchanted_book",
    true,
    false,
    [
        item("Looting I", "minecraft:enchanted_book", 150, 0, undefined, undefined, [{ id: "looting", level: 1 }]),
        item("Looting II", "minecraft:enchanted_book", 350, 0, undefined, undefined, [{ id: "looting", level: 2 }]),
        item("Looting III", "minecraft:enchanted_book", 800, 0, undefined, undefined, [{ id: "looting", level: 3 }]),
    ],
);