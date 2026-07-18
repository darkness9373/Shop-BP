import { category, item } from "../helpers";

export default category(
    "Mending",
    "mending",
    "minecraft:enchanted_book",
    true,
    false,
    [
        item("Mending", "minecraft:enchanted_book", 1200, 0, undefined, undefined, [{ id: "mending", level: 1 }]),
    ],
);