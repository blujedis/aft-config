import { ColorInput } from 'tinycolor2';
export type ThemeShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type ThemeColorObject = Record<ThemeShade, string> & {
    DEFAULT?: string;
};
export type ThemeColors = Record<string, ThemeColorObject>;
export interface Theme {
    name?: string;
    preprocess?: 'colors' | 'variables' | 'both' | 'none';
    colors: ThemeColors;
    variables: Record<string, string>;
}
export declare function getRgbChannels(color: ColorInput): string;
export declare function ensureDefault(colors: Record<string, any>): Record<string, any>;
export declare function generateTailwindVars<T extends ThemeColors>(colors: T, parent?: string): Record<keyof T, ThemeColorObject>;
export declare function generateVariables(variables: Record<string, string>): Record<string, string>;
export declare function generateRootVars<T extends ThemeColors>(colors: T, name?: string): Record<keyof T, ThemeColorObject>;
export declare function generateThemes(config: Record<string, Theme>): Record<string, Record<string, any>>;
export declare const aft: {
    (options: Record<string, Theme>): {
        handler: import("tailwindcss/types/config").PluginCreator;
        config?: Partial<import("tailwindcss/types/config").Config> | undefined;
    };
    __isOptionsFunction: true;
};
export default aft;
