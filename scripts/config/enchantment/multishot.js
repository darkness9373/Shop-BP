import { category, item } from "../helpers";

export default category(
    "Multishot",
    "multishot",
    "minecraft:enchanted_book",
    true,
    false,
    [
        item("Multishot", "minecraft:enchanted_book", 400, 0, undefined, undefined, [{ id: "multishot", level: 1 }]),
    ],
);