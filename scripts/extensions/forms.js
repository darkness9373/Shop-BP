import { Player, RawMessage } from "@minecraft/server";
import {
    custom_content,
    custom_content_keys,
    number_of_custom_items,
} from "./constants";
import { typeIdToID } from "./typeIdToID";
import { ActionFormData } from "@minecraft/server-ui";

const fixedMap = new Map();
let offset = 0;
for (const [typeId, id] of typeIdToID) {
    if (typeId === "minecraft:debug_stick") {
        offset = 1;
        continue;
    }
    fixedMap.set(typeId, id - offset);
}

class DarknessFormData {
    #titleText;
    #bodyText;
    #elements;
    constructor() {
        this.#titleText = { rawtext: [{ text: "§d§a§r§k§r" }] };
        this.#bodyText = { rawtext: [{ text: "" }] };
        this.#elements = [];
    }
    /**
     * @param {string | RawMessage} text
     */
    title(text) {
        if (typeof text === "string") {
            this.#titleText.rawtext.push({ text: text });
        } else if (typeof text === "object") {
            if (text.rawtext) {
                this.#titleText.rawtext.push(...text.rawtext);
            } else {
                this.#titleText.rawtext.push(text);
            }
        }
        return this;
    }
    /**
     * @param {string | RawMessage} text
     */
    body(text = "") {
        if (typeof text === "string") {
            this.#bodyText.rawtext.push({ text: text });
        } else if (typeof text === "object") {
            if (text.rawtext) {
                this.#bodyText.rawtext.push(...text.rawtext);
            } else {
                this.#bodyText.rawtext.push(text);
            }
        }
        return this;
    }
    /**
     * Menambahkan Button ke dalam antrean
     * @param {string | RawMessage} text
     * @param {string} icon
     */
    button(text = "", icon = "", enchanted = false) {
        const targetTexture = custom_content_keys.has(icon)
            ? custom_content[icon]?.texture
            : icon;
        const ID = fixedMap.get(targetTexture);
        const aux =
            ID === undefined
                ? targetTexture
                : (ID + (ID < 256 ? 0 : number_of_custom_items)) * 65536 +
                  (enchanted ? 32768 : 0);

        this.#elements.push({
            type: "button",
            text: text,
            icon: aux,
        });
        return this;
    }
    /**
     * @param {string | RawMessage} text
     */
    label(text = "") {
        this.#elements.push({
            type: "label",
            text: text,
        });
        return this;
    }
    divider() {
        this.#elements.push({
            type: "divider",
        });
        return this;
    }
    /**
     *
     * @param {Player} player
     */
    show(player) {
        const form = new ActionFormData();
        form.title(this.#titleText);
        form.body(this.#bodyText);
        for (const element of this.#elements) {
            switch (element.type) {
                case "button":
                    form.button(element.text, `${element.icon}`);
                    break;
                case "label":
                    form.label(element.text);
                    break;
                case "divider":
                    form.divider();
                    break;
            }
        }
        return form.show(player);
    }
}

export { DarknessFormData };
