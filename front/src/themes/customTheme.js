import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // blue
        },
        secondary: {
            main: '#f50057', // pink
        },
        error: {
            main: '#f44336', // red
        },
        warning: {
            main: '#ff9800', // orange
        },
        success: {
            main: '#4caf50', // green
        },
        info: {
            main: '#2196f3', // light blue
        },
        white:{
            main: '#ffffff',
        },
        background: {
            primary: '#f5f5f5', // light gray
            secondary: '#eeeeee', // lighter gray
            alternate: '#fafafa', // off-white
            surface: '#ffffff', // white
            paper: '#ffffff', // white
        },
        text: {
            primary: '#000000', // black
            secondary: '#757575', // dark gray
            disabled: '#bdbdbd', // light gray
            error: '#f44336', // red
        },
        form: {
            inputBackground: '#ffffff', // white
            inputText: '#000000', // black
            inputBorder: '#bdbdbd', // light gray
            inputPlaceholder: '#757575', // dark gray
            inputLabel: '#757575', // dark gray
        },
        button: {
            primary: '#1976d2', // blue
            secondary: '#f50057', // pink
            default: '#e0e0e0', // gray
            disabled: '#9e9e9e', // dark gray
            text: '#000000', // black
            notmain:'#f50057', // pink

        },
        accent: {
            primary: '#1976d2', // blue
            secondary: '#f50057', // pink
            error: '#f44336', // red
            warning: '#ff9800', // orange
            success: '#4caf50', // green
            info: '#2196f3', // light blue
        },
    },
});

export default customTheme;
