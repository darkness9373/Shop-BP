import { category, item } from "../helpers";

export default category(
    "Flame",
    "flame",
    "minecraft:enchanted_book",
    true,
    false,
    [
        item("Flame", "minecraft:enchanted_book", 300, 0, undefined, undefined, [{ id: "flame", level: 1 }]),
    ],
);