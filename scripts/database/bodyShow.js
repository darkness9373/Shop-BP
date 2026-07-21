import Extra from "./Extra";
import { getMoney } from "./money";
import { getCurrency } from "./objective";

export function bodyShow(player, form) {
    const currency = getCurrency();
    const money = getMoney(player);
    form.body(`${currency}${money}`);
}