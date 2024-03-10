import { StoreClass } from "store-class/StoreClass";
import { get as getKeyVal, set as setKeyVal } from 'idb-keyval';
import { BROWSER } from 'esm-env';

export enum Theme {
    Dark = "dark",
    Light = "light",
    Default = ""
}
const KEY = "_settings_theme";
export class ThemeSettingsStore
    extends StoreClass<ThemeSettingsStore> // to make it observable like svelte store
{
    theme: Theme = Theme.Default;
    constructor() {
        super();
        this.theme = Theme.Default;
        if (BROWSER) {
            (async () => {
                const theme = await getKeyVal(KEY);
                this.theme = theme as Theme || Theme.Default;
                // console.log('theme', this.theme);
                this.reRenderer();
            })();
            this.subscribe((store) => {
                setKeyVal(KEY, store.theme);
            });
        }
    }
}
export const themeSettingsStore = new ThemeSettingsStore();