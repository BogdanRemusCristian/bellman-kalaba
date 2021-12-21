import { ReactElement, useContext } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import RunCircleOutlinedIcon from '@mui/icons-material/RunCircleOutlined';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { makeStyles } from '@mui/styles';

import { PathComponent } from './path.component';
import { StateContext } from '../Utils/state.provider';
import { Path } from '../Models/path.model';

const useClasses = makeStyles(() => ({
    container: {
        width: '35%',
        height: '100%',
        border: '1px solid royalblue',
        borderRadius: 4,
        position: 'relative',
    },
    wrapper: {
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
        padding: 10,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '0px 0 10px 0',
        fontSize: '1rem',
        background: 'royalblue',
        color: 'white',
        padding: '5px',
        borderRadius: '8px',
    },
}));

export const SettingsComponent: React.FC<{}> = (): ReactElement => {
    const {
        totalPaths,
        onTotalPathsChange,
        onExampleChange,
        onModeChange,
        isLoading,
        graph,
        mode,
        onAdd,
        example,
        onReset,
        onSubmit,
        canSubmit,
    } = useContext(StateContext);
    const classes = useClasses();

    return (
        <Box className={classes.container}>
            <Box className={classes.wrapper}>
                <Box>
                    <Typography className={classes.title}>Setări</Typography>
                    <FormControl size='small' sx={{ m: 1, width: '25%' }}>
                        <InputLabel>Numărul de vârfuri...</InputLabel>
                        <Select
                            size='small'
                            fullWidth
                            disabled={totalPaths !== 0}
                            value={totalPaths}
                            label='Numărul de vârfuri...'
                            onChange={onTotalPathsChange}>
                            {Array(10)
                                .fill(0)
                                .map((_, index) =>
                                    index > 2 ? (
                                        <MenuItem key={index} value={index + 1}>
                                            {index + 1}
                                        </MenuItem>
                                    ) : null
                                )}
                        </Select>
                    </FormControl>
                    <FormControl size='small' sx={{ m: 1, width: '25%' }}>
                        <InputLabel>Mod...</InputLabel>
                        <Select
                            size='small'
                            fullWidth
                            disabled={isLoading}
                            value={mode}
                            label='Mod'
                            onChange={onModeChange}>
                            <MenuItem value='min'>Minim</MenuItem>
                            <MenuItem value='max'>Maxim</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size='small' sx={{ m: 1, width: 'calc(50% - 50px)' }}>
                        <InputLabel>Exemplu</InputLabel>
                        <Select
                            size='small'
                            fullWidth
                            disabled={isLoading}
                            label='Exemplu'
                            value={example}
                            onChange={onExampleChange}>
                            <MenuItem value='ex1'>Exemplu 1</MenuItem>
                            <MenuItem value='ex2'>Exemplu 2</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Backdrop open={isLoading} unmountOnExit>
                    <CircularProgress color='error' />
                </Backdrop>
                <Typography className={classes.title}>Muchii graf</Typography>
                {graph.map((path: Path, index: number) => (
                    <PathComponent key={index} path={path} index={index} />
                ))}
                <Box display='flex' flexDirection='row' justifyContent='space-between'>
                    <Button
                        disabled={totalPaths === 0}
                        sx={{ m: 1 }}
                        color='success'
                        variant='outlined'
                        onClick={onAdd}
                        startIcon={<AddCircleOutlineRoundedIcon />}>
                        Muchie nouă
                    </Button>
                    <Button
                        disabled={totalPaths === 0}
                        sx={{ m: 1 }}
                        color='warning'
                        variant='outlined'
                        onClick={onReset}
                        startIcon={<RestartAltRoundedIcon />}>
                        Reset
                    </Button>
                    <Button
                        disabled={!canSubmit() || totalPaths === 0}
                        sx={{ m: 1 }}
                        color='primary'
                        variant='outlined'
                        onClick={onSubmit}
                        startIcon={<RunCircleOutlinedIcon />}>
                        Start
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
