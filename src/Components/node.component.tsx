import { FormControl, Box, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Node } from '../Models/node.model';

export const NodeComponent = ({
    node,
    index,
    totalNodes,
    remove,
    change,
}: {
    node: Node;
    index: number;
    totalNodes: number;
    remove: (index: number) => void;
    change: (index: number, name: string, value: number) => void;
}) => {
    const onRemove = () => {
        remove(index);
    };
    const onChange = (name: string) => (e: any) => {
        const value = +(e.target as HTMLInputElement).value;
        change(index, name, value);
        if (name === 'from') {
            change(index, 'to', 0);
        }
    };
    return (
        <Box component='form' noValidate autoComplete='off'>
            <FormControl size='small' sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>De la...</InputLabel>
                <Select
                    renderValue={(node) => node !== 0 && `Nodul ${node}`}
                    value={node.from}
                    label='De la...'
                    onChange={onChange('from')}>
                    {Array(totalNodes)
                        .fill(0)
                        .map((_, i) => (
                            <MenuItem key={i} value={i + 1}>
                                {i + 1}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
            <FormControl size='small' sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Până la...</InputLabel>
                <Select
                    disabled={!node.from}
                    renderValue={(node) => node !== 0 && `Nodul ${node}`}
                    value={node.to}
                    label='Până la...'
                    onChange={onChange('to')}>
                    {Array(totalNodes)
                        .fill(0)
                        .map((_, i) =>
                            i !== node.from - 1 ? (
                                <MenuItem key={i} value={i + 1}>
                                    {i + 1}
                                </MenuItem>
                            ) : null
                        )}
                </Select>
            </FormControl>
            <FormControl>
                <TextField
                    disabled={!node.to}
                    size='small'
                    label='Distanță...'
                    variant='outlined'
                    defaultValue={node.distance}
                    onChange={onChange('distance')}
                    sx={{ m: 1, maxWidth: 120 }}
                />
            </FormControl>
            <FormControl>
                <Button
                    sx={{ m: 1 }}
                    color='error'
                    variant='outlined'
                    onClick={onRemove}
                    startIcon={<DeleteIcon />}>
                    Șterge
                </Button>
            </FormControl>
        </Box>
    );
};
