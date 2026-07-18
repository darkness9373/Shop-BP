import {
    CustomForm,
    ObservableNumber,
    ObservableString,
} from "@minecraft/server-ui";

export function addCategory(player) {
    const dropNum = new ObservableNumber(0, { clientWritable: true });
    const CatName = new ObservableString("", { clientWritable: true });
    const CatCode = new ObservableString("", { clientWritable: true });
    function updateDynamic() {}
    dropNum.subscribe(() => updateDynamic());
    const form = new CustomForm(player, "Add Category");
    form.dropdown("Type", dropNum, [
        { label: "Normal", description: "A normal category", value: 0 },
        { label: "For Subcategory", description: 'Category used for subcategory', value: 1 },
    ]);
    form.textField("Category Name", CatName, {
        description: "The name of the category",
    });
    form.textField("Category Code", CatCode, { description: "The code of the category (no space)" });
    form.button('Add Category', () => {})
    form.show();
}
