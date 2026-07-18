import { category, item } from "../helpers";

export default category(
    "Sharpness",
    "sharpness",
    "minecraft:enchanted_book",
    true,
    false,
    [
        item("Sharpness I", "minecraft:enchanted_book", 50, 0, undefined, undefined, [{ id: "sharpness", level: 1 }]),
        item("Sharpness II", "minecraft:enchanted_book", 120, 0, undefined, undefined, [{ id: "sharpness", level: 2 }]),
        item("Sharpness III", "minecraft:enchanted_book", 280, 0, undefined, undefined, [{ id: "sharpness", level: 3 }]),
        item("Sharpness IV", "minecraft:enchanted_book", 600, 0, undefined, undefined, [{ id: "sharpness", level: 4 }]),
        item("Sharpness V", "minecraft:enchanted_book", 1500, 0, undefined, undefined, [{ id: "sharpness", level: 5 }]),
    ],
);