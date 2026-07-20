import {
    CustomForm,
    ObservableNumber,
    ObservableString,
} from "@minecraft/server-ui";
import { category } from "../config/helpers";
import { categoryManager } from "../config/index";

export function addSubCategory(player) {
    const CatName = new ObservableString('', { clientWritable: true });
    const CatCode = new ObservableString('', { clientWritable: true });
    const CatIcon = new ObservableString('', { clientWritable: true });
    const form = new CustomForm(player, 'Add Sub Category');
    form.textField("Category Name", CatName, {
        description: "The name of the category",
    });
    form.textField("Category Code", CatCode, {
        description: "The code of the category (no space)",
    });
    form.textField("Category Icon", CatIcon, {
        description: "The icon of the category (texture path or identifier)",
    });
    form.button('Add Sub Category', () => {
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
    });
    form.show();
}