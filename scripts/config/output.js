export const output = {
    success: {
        buy: (qtInput, item) => `§aPurchased ${qtInput.getData()}× ${item.name}`,
        sell: (qtInput, item) => `§aSold ${qtInput.getData()}× ${item.name}`,
    },
    failed: {
        nosell: "§cThis item is not for sale",
        qtyzero: "§cQuantity can't be 0",
        qtyinvalid: "§cInvalid Quantity",
        qtymax: "§cQuantity exceeded the limit",
        nomoney: "§cNot enough money",
        noitem: '§cInsufficient items',
        nospace: '§cNot enough inventory slots'
    },
};
