import { system, world } from "@minecraft/server";
import { CategoryManager } from "../database/CategoryManager";
import redstone from "./redstone";
import equipment from "./equipments";
import sword from "./equipment/sword";
import axe from "./equipment/axe";
import ore from "./ore";
import pickaxe from "./equipment/pickaxe";
import enchantments from "./enchantments";
import efficiency from "./enchantment/efficiency";
import flame from "./enchantment/flame";
import looting from "./enchantment/looting";
import lunge from "./enchantment/lunge";
import mending from "./enchantment/mending";
import multishot from "./enchantment/multishot";
import protection from "./enchantment/protection";
import sharpness from "./enchantment/sharpness";
import silk_touch from "./enchantment/silk_touch";
import unbreaking from "./enchantment/unbreaking";

export const categoryManager = new CategoryManager();

world.afterEvents.worldLoad.subscribe(() => {
    categoryManager.loadDefault([
        axe,
        equipment,
        enchantments,
        ore,
        pickaxe,
        redstone,
        sword,
        efficiency,
        flame,
        looting,
        lunge,
        mending,
        multishot,
        protection,
        sharpness,
        silk_touch,
        unbreaking,
    ]);
    categoryManager.loadCustom();
});
