import {
    CustomForm,
    ObservableNumber,
    ObservableString,
} from "@minecraft/server-ui";
import { category, itemSub } from "../config/helpers";
import { categoryManager } from "../config/index";

export function addSubCategory(player, code) {
    const CatName = new ObservableString("", { clientWritable: true });
    const CatCode = new ObservableString("", { clientWritable: true });
    const CatIcon = new ObservableString("", { clientWritable: true });
    const form = new CustomForm(player, "Add Sub Category");
    form.textField("Category Name", CatName, {
        description: "The name of the category",
    });
    form.textField("Category Code", CatCode, {
        description: "The code of the category (no space)",
    });
    form.textField("Category Icon", CatIcon, {
        description: "The icon of the category (texture path or identifier)",
    });
    form.button("Add Sub Category", () => {
        if (CatName.getData().length < 3) {
            form.close();
            player.sendMessage(
                "§cCategory name should be at least 3 characters",
            );
            return;
        }
        if (CatCode.getData().length < 3) {
            form.close();
            player.sendMessage(
                "§cCategory code should be at least 3 characters",
            );
            return;
        }
        const data = category(
            CatName.getData().trim(),
            CatCode.getData().trim(),
            CatIcon.getData().trim(),
            true,
            false,
        );
        const add = categoryManager.addCategory(data);
        if (add.status === false) {
            form.close();
            return player.sendMessage(add.message);
        }
        const bridgeData = itemSub(
            CatName.getData().trim(),
            CatCode.getData().trim(),
            CatIcon.getData().trim(),
            false,
        );
        const bridge = categoryManager.addItem(code, bridgeData);
        if (bridge.status === false) {
            form.close();
            categoryManager.deleteCategory(CatCode.getData().trim());
            return player.sendMessage(bridge.message);
        }
        form.close();
        player.sendMessage(add.message);
    });
    form.show();
}
