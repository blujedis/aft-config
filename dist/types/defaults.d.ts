import defaultTailwindColors from 'tailwindcss/colors';
declare const defaultColors: {
    /**
     * @see https://www.tailwindshades.com/#color=220%2C15.294117647058819%2C50&step-up=8&step-down=11&hue-shift=0&name=slate-gray&base-stop=5&v=1&overrides=eyIxIjp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjk0LCJoZXgiOiJFREVGRjIiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCIyIjp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjg5LCJoZXgiOiJERkUyRTciLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCIzIjp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjgxLCJoZXgiOiJDN0NDRDYiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCI0Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjY4LCJoZXgiOiJBMUE5QkEiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCI1Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjU3LCJoZXgiOiI4MThDQTIiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCI2Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjQ4LCJoZXgiOiI2ODc0OEQiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCI3Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjM2LCJoZXgiOiI0RTU3NkEiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCI4Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjIyLCJoZXgiOiIzMDM1NDEiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCI5Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjEwLCJoZXgiOiIxNjE4MUQiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCIwLjUiOnsiaHVlIjotMSwic2F0dXJhdGlvbiI6LTEsImxpZ2h0bmVzcyI6OTgsImhleCI6IkY5RkFGQiIsInRleHRDb2xvciI6ImJsYWNrIn0sIjkuNSI6eyJodWUiOi0xLCJzYXR1cmF0aW9uIjotMSwibGlnaHRuZXNzIjo1LCJoZXgiOiIwQjBDMEYiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9fQ%3D%3D
     */
    frame: {
        900: string;
        950: string;
        '50': "#f9fafb";
        '100': "#f3f4f6";
        '200': "#e5e7eb";
        '300': "#d1d5db";
        '400': "#9ca3af";
        '500': "#6b7280";
        '600': "#4b5563";
        '700': "#374151";
        '800': "#1f2937";
    };
    primary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    secondary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    tertiary: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    danger: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    warning: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    success: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
    info: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        950: string;
    };
};
declare const defaultTheme: {
    name: string;
    variables: {
        '--text-light': "#f3f4f6";
        '--text-dark': "#374151";
        '--bg-light': string;
        '--bg-dark': string;
        '--bg-white': string;
        '--body-text-light': "#374151";
        '--body-text-dark': "#f3f4f6";
        '--body-bg-light': string;
        '--body-bg-dark': string;
    };
    colors: {
        /**
         * @see https://www.tailwindshades.com/#color=220%2C15.294117647058819%2C50&step-up=8&step-down=11&hue-shift=0&name=slate-gray&base-stop=5&v=1&overrides=eyIxIjp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjk0LCJoZXgiOiJFREVGRjIiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCIyIjp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjg5LCJoZXgiOiJERkUyRTciLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCIzIjp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjgxLCJoZXgiOiJDN0NDRDYiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCI0Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjY4LCJoZXgiOiJBMUE5QkEiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCI1Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjU3LCJoZXgiOiI4MThDQTIiLCJ0ZXh0Q29sb3IiOiJibGFjayJ9LCI2Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjQ4LCJoZXgiOiI2ODc0OEQiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCI3Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjM2LCJoZXgiOiI0RTU3NkEiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCI4Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjIyLCJoZXgiOiIzMDM1NDEiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCI5Ijp7Imh1ZSI6LTEsInNhdHVyYXRpb24iOi0xLCJsaWdodG5lc3MiOjEwLCJoZXgiOiIxNjE4MUQiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9LCIwLjUiOnsiaHVlIjotMSwic2F0dXJhdGlvbiI6LTEsImxpZ2h0bmVzcyI6OTgsImhleCI6IkY5RkFGQiIsInRleHRDb2xvciI6ImJsYWNrIn0sIjkuNSI6eyJodWUiOi0xLCJzYXR1cmF0aW9uIjotMSwibGlnaHRuZXNzIjo1LCJoZXgiOiIwQjBDMEYiLCJ0ZXh0Q29sb3IiOiJ3aGl0ZSJ9fQ%3D%3D
         */
        frame: {
            900: string;
            950: string;
            '50': "#f9fafb";
            '100': "#f3f4f6";
            '200': "#e5e7eb";
            '300': "#d1d5db";
            '400': "#9ca3af";
            '500': "#6b7280";
            '600': "#4b5563";
            '700': "#374151";
            '800': "#1f2937";
        };
        primary: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
            950: string;
        };
        secondary: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
            950: string;
        };
        tertiary: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
            950: string;
        };
        danger: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
            950: string;
        };
        warning: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
            950: string;
        };
        success: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
            950: string;
        };
        info: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
            950: string;
        };
    };
};
export { defaultTailwindColors, defaultColors, defaultTheme };
