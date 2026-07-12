import { Player, RawMessage } from "@minecraft/server";
import { custom_content, custom_content_keys, number_of_custom_items } from "./constants";
import { typeIdToID } from "./typeIdToID";
import { ActionFormData } from '@minecraft/server-ui';

class DarknessFormData {
    #titleText;
    #button;
    #bodyText;
    constructor() {
        this.#titleText = { rawtext: [{ text: "§d§a§r§k§r" }] };
        this.#bodyText = { rawtext: [{ text: "" }] };
        this.#button = [];
    }
    /**
     *
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
     *
     * @param {string | RawMessage} text
     * @param {string} icon
     */
    button(text = "", icon = "", enchanted = false) {
        const targetTexture = custom_content_keys.has(icon)
            ? custom_content[icon]?.texture
            : icon;
        const ID = typeIdToID.get(targetTexture);
        const aux = ID === undefined ? targetTexture : ((ID + (ID < 256 ? 0 : number_of_custom_items)) * 65536) + (enchanted ? 32768 : 0);
        this.#button.push({
            text: text,
            icon: aux
        });
        return this;
    }
    /**
     * 
     * @param {string | RawMessage} text 
     */
    body(text = '') {
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
     * 
     * @param {Player} player 
     */
    show(player) {
        const form = new ActionFormData();
        form.title(this.#titleText);
        form.body(this.#bodyText);
        for (const but of this.#button) {
            form.button(but.text, `${but.icon}`);
        }
        return form.show(player);
    }
}

export { DarknessFormData };