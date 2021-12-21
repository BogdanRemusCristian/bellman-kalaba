import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Path } from '../Models/path.model';
import { useCallback, useContext } from 'react';
import { StateContext } from '../Utils/state.provider';

export const PathComponent = ({ path, index }: { path: Path; index: number }) => {
    const { onPathRemove, onPathChange, totalPaths } = useContext(StateContext);

    const onRemove = useCallback(() => {
        onPathRemove(index);
    }, [index, onPathRemove]);

    const onChange = (name: string) => (e: any) => {
        const value = +(e.target as HTMLInputElement).value;
        onPathChange(index, name, value);
        if (name === 'from') {
            onPathChange(index, 'to', 0);
        }
    };
    return (
        <Box component='form' noValidate autoComplete='off'>
            <FormControl size='small' sx={{ m: 1, minWidth: 105 }}>
                <InputLabel>De la</InputLabel>
                <Select
                    renderValue={(path) => path !== 0 && `Nodul ${path}`}
                    value={path.from}
                    label='De la'
                    onChange={onChange('from')}>
                    {Array(totalPaths)
                        .fill(0)
                        .map((_, i) => (
                            <MenuItem key={i} value={i + 1}>
                                {i + 1}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
            <FormControl size='small' sx={{ m: 1, minWidth: 105 }}>
                <InputLabel>Până la</InputLabel>
                <Select
                    disabled={!path.from}
                    renderValue={(path) => path !== 0 && `Nodul ${path}`}
                    value={path.to}
                    label='Până la'
                    onChange={onChange('to')}>
                    {Array(totalPaths)
                        .fill(0)
                        .map((_, i) =>
                            i !== path.from - 1 ? (
                                <MenuItem key={i} value={i + 1}>
                                    {i + 1}
                                </MenuItem>
                            ) : null
                        )}
                </Select>
            </FormControl>
            <FormControl>
                <TextField
                    disabled={!path.to}
                    size='small'
                    label='Cost'
                    variant='outlined'
                    defaultValue={path.cost}
                    onChange={onChange('cost')}
                    sx={{ m: 1, maxWidth: 60 }}
                />
            </FormControl>
            <FormControl>
                <Button
                    sx={{ m: 1 }}
                    color='error'
                    variant='outlined'
                    style={{ width: 'calc(100% + 5px)' }}
                    onClick={onRemove}
                    startIcon={<DeleteIcon />}>
                    Șterge
                </Button>
            </FormControl>
        </Box>
    );
};
