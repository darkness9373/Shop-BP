import {
    CustomForm,
    ObservableNumber,
    ObservableString,
} from "@minecraft/server-ui";
import { categoryManager } from "../config/index";
import { item } from "../config/helpers";

export function addItem(player, code, back, frm, sub) {
    const Name = new ObservableString("", { clientWritable: true });
    const OutputLabel = new ObservableString("");
    const ID = new ObservableString("", { clientWritable: true });
    const Icon = new ObservableString("", { clientWritable: true });
    const Buy = new ObservableString("", { clientWritable: true });
    const Sell = new ObservableString("", { clientWritable: true });
    const form = new CustomForm(player, "Add Items");

    form.textField("Items Name", Name, { description: "The name of the item" });
    form.textField("Items Identifier", ID, {
        description: "Item ID and showed icon",
    });
    form.textField("Path Texture (optional)", Icon, {
        description:
            "if the path is empty, the icon will use the ID to render (3D block use the ID to render)",
    });
    form.textField("Buy Price", Buy);
    form.textField("Sell Price", Sell, {
        description: "leave blank if item is not for sale",
    });
    form.spacer();
    form.label(OutputLabel);
    form.spacer();
    form.button("Add Items", () => {
        let texture = ID.getData().trim();
        if (Name.getData().trim().length < 3)
            return OutputLabel.setData(
                "Item name should be at least 3 characters",
            );
        const validate = isValidMinecraftId(ID.getData().trim());
        if (!validate) return OutputLabel.setData("§cIdentifier is not valid");
        const buyValid = parseAndValidateAmount(Buy.getData(), {
            allowZero: false,
        });
        if (!buyValid.isValid) return OutputLabel.setData(buyValid.reason);
        const sellValid = parseAndValidateAmount(Sell.getData(), {
            allowZero: true,
            defaultValue: 0,
        });
        if (!sellValid.isValid) return OutputLabel.setData(sellValid.reason);
        if (Icon.getData().trim().length > 0) {
            texture = Icon.getData().trim();
        }
        const data = item(
            Name.getData().trim(),
            ID.getData().trim(),
            buyValid.value,
            sellValid.value,
        );
        const send = categoryManager.addItem(code, data);
        if (!send.status) return OutputLabel.setData(send.message);
        OutputLabel.setData(send.message);
    });
    form.show().then(() => {
        if (!sub) {
            frm(player, code, back);
        } else {
            frm(player, code, sub, back);
        }
    });
}

function isValidMinecraftId(identifier) {
    const regex = /^[a-z0-9]+:[a-z0-9_]+$/;
    return regex.test(identifier);
}

function parseAndValidateAmount(
    inputString,
    { allowZero = false, defaultValue = null } = {},
) {
    const str = String(inputString ?? "").trim();
    if (str === "") {
        if (defaultValue !== null) {
            return { isValid: true, value: defaultValue };
        }
        return {
            isValid: false,
            value: null,
            reason: "§cBuy input cannot be empty",
        };
    }
    const num = Number(str);
    if (Number.isNaN(num) || !Number.isInteger(num)) {
        return {
            isValid: false,
            value: null,
            reason: "§cBuy and sell inputs must be integers",
        };
    }
    const min = allowZero ? 0 : 1;
    if (num < min) {
        return {
            isValid: false,
            value: null,
            reason: allowZero
                ? "§cBuy and sell inputs cannot be negative"
                : "§cBuy input must be greater than 0",
        };
    }
    return { isValid: true, value: num };
}
