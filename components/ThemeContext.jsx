import React from 'react'

export const THEMES = {
    light: {
        background: 'hsl(0, 0%, 98%)',
        foreground: 'hsl(0, 0%, 100%)', // element
        text: 'hsl(200, 15%, 8%)',
        input: 'hsl(0, 0%, 52%)',
    },
    dark: {
        background: 'hsl(207, 26%, 17%)',
        foreground: 'hsl(209, 23%, 22%)',
        text: 'hsl(0, 0%, 100%)',
        input: 'hsl(0, 0%, 52%)',
    }
}

const ThemeContext = React.createContext();

export default ThemeContext;