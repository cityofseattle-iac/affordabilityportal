import {createMuiTheme} from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {main: '#003da5'}, // Blue Navigation
        secondary: {main: '#11cb5f'}, // This is just green for now.
    },
    overrides: {
        MuiButton: {
            root: {
                // Some CSS
                borderRadius: 'none',
                border: 0,
                color: 'white',
                height: 44,
                boxShadow: 'none',
            },
            text: {
                // Some CSS
                borderRadius: 'none',
                border: 0,
                color: '#000000',
                height: 'auto',
                fullWidth: false,
                boxShadow: 0,
                background: 0
            },
        },
    },
    typography: {
        fontSize: 13,
        h1: {
            fontSize: 32,
            lineHeight: '24px',
            fontWeight: 800,
            color: '#373737',
            paddingBottom: 15,
        },
        h2: {
            fontSize: 30,
            fontWeight: 700,
            lineHeight: '24px',
            color: '#4C4C4C',
            paddingBottom: 20,
        },
        h3: {
            fontSize: 30,
            fontWeight: 700,
            lineHeight: '24px',
            paddingBottom: 25,
            color: '#4C4C4C',
        },
        h4: {
            fontSize: 28,
            fontWeight: 700,
            lineHeight: '24px',
            paddingBottom: 10,
            color: '#4C4C4C',
        },
        h5: {
            fontSize: 18,
            fontWeight: 700,
            lineHeight: '24px',
            paddingBottom: 10,
            color: '#4C4C4C',
        },
        h6: {
            fontSize: 16,
            fontWeight: 600,
            color: '#4C4C4C',
        },
        body1: {
            fontSize: 16,
            color: '#373737',
            padding: 0,
            fontWeight: 400,
        },
        body2: {
            fontSize: 16,
            color: '#4C4C4C',
            padding: 0,
            margin: 0,
            fontWeight: 200,
        },
        useNextVariants: true,
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'Seattle Text',
            'Helvetica Neue',
            'sans-serif',
        ].join(','),
    },
});

export default theme;
