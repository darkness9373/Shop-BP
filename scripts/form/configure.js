import { CustomForm, ObservableString } from "@minecraft/server-ui";
import { getCurrency, getObjectiveMoney } from "../database/objective";
import { world } from "@minecraft/server";

export function openConfig(player) {
    const CurrencyInput = new ObservableString(getCurrency(), {
        clientWritable: true,
    });
    const ObjectiveInput = new ObservableString(getObjectiveMoney(), {
        clientWritable: true,
    });
    const CurrencyLabel = new ObservableString(
        `Currency Symbol: §a${getCurrency()}`,
    );
    const ObjectiveLabel = new ObservableString(
        `Objective: §a${getObjectiveMoney()}`,
    );

    function updateCRC() {
        if (CurrencyInput.getData().trim() === "") {
            CurrencyLabel.setData(`Currency Symbol: §a${getCurrency()}`);
        } else {
            CurrencyLabel.setData(
                `Currency Symbol: §6${CurrencyInput.getData().trim()}`,
            );
        }
    }
    function updateOBJ() {
        if (ObjectiveInput.getData().trim() === "") {
            ObjectiveLabel.setData(`Objective: §a${getObjectiveMoney()}`);
        } else {
            ObjectiveLabel.setData(
                `Objective: §6${ObjectiveInput.getData().trim()}`,
            );
        }
    }

    ObjectiveInput.subscribe(() => updateOBJ());
    CurrencyInput.subscribe(() => updateCRC());

    const form = new CustomForm(player, "Shop Configuration");
    form.spacer();
    form.label(CurrencyLabel);
    form.spacer();
    form.label(ObjectiveLabel);
    form.spacer();
    form.divider();
    form.spacer();
    form.textField("Currency", CurrencyInput);
    form.textField("Objective", ObjectiveInput);
    form.button("Submit", () => {
        form.close();
        const obj = ObjectiveInput.getData().trim();
        const cur = CurrencyInput.getData().trim();
        if (obj !== "") {
            world.setDynamicProperty("drk:obj", obj);
        }
        if (cur !== "") {
            world.setDynamicProperty("drk:currency", cur);
        }
        player.sendMessage(`Config Set:\n - Currency Symbol: §a${cur}\n§r - Objective: §a${obj}`)
    });
    form.show();
}
