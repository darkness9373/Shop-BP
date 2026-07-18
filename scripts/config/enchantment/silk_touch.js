import { category, item } from "../helpers";

export default category(
    "Silk Touch",
    "silk_touch",
    "minecraft:enchanted_book",
    true,
    false,
    [
        item("Silk Touch", "minecraft:enchanted_book", 600, 0, undefined, undefined, [{ id: "silk_touch", level: 1 }]),
    ],
);