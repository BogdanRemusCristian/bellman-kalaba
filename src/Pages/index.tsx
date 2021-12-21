import { ReactElement } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { StateContextProvider } from '../Utils/state.provider';
import { SettingsComponent } from '../Components/settings.component';
import { ResultsComponent } from '../Components/results.component';
import { makeStyles } from '@mui/styles';

const useClasses = makeStyles(() => ({
    container: {
        width: '100%',
        height: 'calc(100vh - 45px)',
        padding: 10,
    },
    wrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirectionn: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 10,
        background: '#efefef',
        borderRadius: 4,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '0px 0 30px 0',
        fontSize: '1rem',
        background: '#2a2a2b',
        color: '#fafafa',
        padding: '5px',
        overflow: 'hidden',
        borderRadius: 4,
    },
}));

const App: React.FC<{}> = (): ReactElement => {
    const classes = useClasses();

    return (
        <Box className={classes.container}>
            <Typography className={classes.title}>ALGORITMUL BELLMAN-KALABA</Typography>
            <StateContextProvider>
                <Box className={classes.wrapper}>
                    <SettingsComponent />
                    <ResultsComponent />
                </Box>
            </StateContextProvider>
        </Box>
    );
};

export default App;
