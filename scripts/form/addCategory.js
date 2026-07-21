import {
    CustomForm,
    ObservableNumber,
    ObservableString,
} from "@minecraft/server-ui";
import { category } from "../config/helpers";
import { categoryManager } from "../config/index";

export function addCategory(player) {
    const manager = categoryManager;
    const dropNum = new ObservableNumber(0, { clientWritable: true });
    const CatName = new ObservableString("", { clientWritable: true });
    const CatCode = new ObservableString("", { clientWritable: true });
    const CatIcon = new ObservableString("", { clientWritable: true });
    function updateDynamic() {}
    const form = new CustomForm(player, "Add Category");
    form.dropdown("Type", dropNum, [
        { label: "Normal", description: "A normal category", value: 0 },
        {
            label: "For Subcategory",
            description: "Category used for subcategory",
            value: 1,
        },
    ]);
    form.textField("Category Name", CatName, {
        description: "The name of the category",
    });
    form.textField("Category Code", CatCode, {
        description: "The code of the category (no space)",
    });
    form.textField("Category Icon", CatIcon, {
        description: "The icon of the category (texture path or identifier)",
    });
    form.button("Add Category", () => {
        if (CatName.getData().length < 3) {
            form.close();
            player.sendMessage('§cCategory name should be at least 3 characters');
            return;
        }
        if (CatCode.getData().length < 3) {
            form.close();
            player.sendMessage('§cCategory code should be at least 3 characters');
            return;
        }
        const select = dropNum.getData();
        if (dropNum === 0) {
            const data = category(
                CatName.getData(),
                CatCode.getData(),
                CatIcon.getData(),
                false,
                true,
            );
            const send = manager.addCategory(data);
            if (send.status === false) {
                form.close();
                return player.sendMessage(send.message)
            }
            form.close();
            player.sendMessage(send.message)
        } else {
            const data = category(
                CatName.getData(),
                CatCode.getData(),
                CatIcon.getData(),
                true,
                true,
            );
            const send = manager.addCategory(data);
            if (send.status === false) {
                form.close();
                return player.sendMessage(send.message)
            }
            form.close();
            player.sendMessage(send.message);
        }
    });
    form.show();
}
