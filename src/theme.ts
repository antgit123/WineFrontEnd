import { createTheme, ThemeOptions } from "@mui/material";

declare module '@mui/material/styles' {
    interface Palette {
        commonGreen?: Palette['primary'];
    }
    interface PaletteOptions {
        commonGreen? : PaletteOptions['primary'];
    }
}

const defaultFont = {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '28px'
}

const palette = {
    background:{
        default: "#F5F5F5"
    },
    primary:{
        main: '#0F1010',
        secondary: '#242525'
    },
    commonGreen:{
        main: '#00ADA8',
        dark: '#00928D'
    }
}

const themeOptions: ThemeOptions = {
    palette,
    typography: {
        body1: {
            ...defaultFont
        },
        body2:{
            ...defaultFont,
            fontWeight: '300'
        },
        h1:{
            ...defaultFont,
            fontSize: '40px',
            lineHeight: '45px',
            color: palette.primary.main
        },
        caption: {
            ...defaultFont,
            color: palette.primary.secondary,
            fontSize: '21px',
            lineHeight: '32px',
            textTransform: 'capitalize',
            letterSpacing: 'none'
        },
        subtitle1:{
            ...defaultFont,
            fontSize: '15px',
            lineHeight: '18px',
            color: palette.primary.main
        },
        subtitle2:{
            ...defaultFont,
            fontSize: '13px',
            lineHeight: '18px'
        },
        button: {
            ...defaultFont,
            fontSize: '11px',
            lineHeight: '16px',
            fontWeight: '400',
        }
    },
    components:{}
}

const theme = createTheme(themeOptions);

export default theme;