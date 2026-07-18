import {
    CustomForm,
    ObservableBoolean,
    ObservableString,
} from "@minecraft/server-ui";
import { categoryManager } from "../config/index";
import { shopConfig } from "../config/shop";
import { getCurrency } from "../database/objective";
import { getMoney } from "../database/money";
import { system } from "@minecraft/server";
import { confirmRun } from "./confirmFunction";

export function confirmItemSub(player, item, back, frm, code, sub) {
    const quantityInput = new ObservableString("1", {
        clientWritable: true,
    });
    const buysellInput = new ObservableBoolean(true, { clientWritable: true });
    const quantityLabel = new ObservableString("Quantity: 1");
    const modeLabel = new ObservableString("Mode: §aBuy");
    const totalLabel = new ObservableString(
        `Total: §6${getCurrency()}${item.buy}`,
    );
    const outputLabel = new ObservableString("");
    const submitLabel = new ObservableString("Buy");
    const moneyLabel = new ObservableString(
        `Money: §a${getCurrency()}${getMoney(player)}`,
    );

    function updateDynamic() {
        const qt = Number(quantityInput.getData());
        let total;
        if (isNaN(qt)) {
            quantityLabel.setData("Quantity: §cinvalid");
            totalLabel.setData("Total: §cinvalid");
            total = "invalid";
        } else if (qt > shopConfig.MAX_ITEM_AMOUNT) {
            quantityLabel.setData("Quantity: §cexceeds the limit");
            totalLabel.setData("Total: §cinvalid");
            total = "limit";
        } else {
            quantityLabel.setData(`Quantity: ${qt}`);
            totalLabel.setData(
                `Total: §6${getCurrency()}${buysellInput.getData() ? qt * item.buy : qt * item.sell}`,
            );
            total = buysellInput.getData() ? qt * item.buy : qt * item.sell;
        }
        if (buysellInput.getData() === true) {
            modeLabel.setData(`Mode: §aBuy`);
            submitLabel.setData("Buy");
        } else {
            modeLabel.setData("Mode: §cSell");
            submitLabel.setData("Sell");
        }
        if (!isNaN(total)) {
            moneyLabel.setData(
                `Money: ${buysellInput.getData() ? (getMoney(player) >= total ? "§a" : "§c") : "§a"}${getCurrency()}${getMoney(player)}`,
            );
        }
    }

    quantityInput.subscribe(() => updateDynamic());
    buysellInput.subscribe(() => updateDynamic());

    const form = new CustomForm(player, item.name);
    form.divider();
    form.spacer();
    form.label(`Buy: §a${getCurrency()}${item.buy}`);
    form.spacer();
    form.label(`Sell: §6${getCurrency()}${item.sell}`);
    form.spacer();
    form.divider();
    form.spacer();
    form.label(modeLabel);
    form.spacer();
    form.label(quantityLabel);
    form.spacer();
    form.label(totalLabel);
    form.spacer();
    form.divider();
    form.spacer();
    form.label(moneyLabel);
    form.spacer();
    form.label(outputLabel);
    form.spacer();
    form.spacer();
    form.textField("Quantity", quantityInput, {
        description: `Amount of the item (1 - ${shopConfig.MAX_ITEM_AMOUNT})`,
        placeholder: "1",
    });
    form.toggle("Sell / Buy", buysellInput);
    form.button(submitLabel, () => {
        const update = {
            qtInput: quantityInput,
            outLabel: outputLabel,
            toggleInput: buysellInput,
            updateDynamic: updateDynamic,
        };
        confirmRun(player, item, update);
    });
    form.button("Back", () => {
        form.close();
        system.runTimeout(() => {
            frm(player, code, sub, back);
        }, 5);
    });
    form.show();
}
