import { category, item } from "../helpers";

export default category(
    "Unbreaking",
    "unbreaking",
    "minecraft:enchanted_book",
    true,
    false,
    [
        item("Unbreaking I", "minecraft:enchanted_book", 80, 0, undefined, undefined, [{ id: "unbreaking", level: 1 }]),
        item("Unbreaking II", "minecraft:enchanted_book", 200, 0, undefined, undefined, [{ id: "unbreaking", level: 2 }]),
        item("Unbreaking III", "minecraft:enchanted_book", 500, 0, undefined, undefined, [{ id: "unbreaking", level: 3 }]),
    ],
);