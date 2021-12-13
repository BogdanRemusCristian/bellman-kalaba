import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { ReactElement, useState, useEffect } from 'react';
import { NodeComponent } from '../Components/node.component';
import { Node } from '../Models/node.model';
import { exampleGraph } from '../Utils/exampleGraph';
import Button from '@mui/material/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import RunCircleOutlinedIcon from '@mui/icons-material/RunCircleOutlined';
import { LastColumn } from '../Models/last-column.model';
// import TextField from '@mui/material/TextField';

const App: React.FC<{}> = (): ReactElement => {
    const [totalNodes, setTotalNodes] = useState(7);
    const [graph, setGraph] = useState<Node[]>(exampleGraph);
    const [lastColumns, setLastColumns] = useState<LastColumn[]>([]);
    const onAdd = (): void => {
        const node = new Node(0, 0, 0);
        setGraph((oldGraph) => [...oldGraph, node]);
    };

    const onRemove = (i: number) => {
        setGraph((oldGraph) => oldGraph.filter((_, index) => i !== index));
    };

    const onChange = (i: number, name: string, value: number): void => {
        setGraph((oldGraph) =>
            oldGraph.map((node, index) => {
                if (i !== index) {
                    return node;
                }
                return {
                    ...node,
                    [name]: value,
                };
            })
        );
    };

    const onTotalNodesChange = (e: any) => {
        setTotalNodes(e.target.value);
        const nodes = Array<Node>(e.target.value).fill(new Node(0, 0, 0));
        setGraph(nodes);
    };

    const onReset = () => {
        setTotalNodes(0);
        setGraph([]);
    };

    const onSubmit = () => {
        const nodes = reduceToZeroNodes(graph);
        const matrix = generateMatrix(nodes);
        // console.table(matrix);
    };

    const generateMatrix = (nodes: Node[]) => {
        const matrix = Array(totalNodes).fill(Array(totalNodes).fill(0));
        return matrix.map((row, i) =>
            row.map((element: number, j: number) => {
                if (i === j) return element;
                const node = nodes.find((node) => node.from === i && node.to === j);
                return node ? node.distance : Infinity;
            })
        );
    };

    const canSubmit = () => {
        return graph.reduce((bool: boolean, node) => {
            if (node.to === 0 || node.from === 0 || node.distance === 0) {
                bool = false;
            }
            return bool;
        }, true);
    };

    const reduceToZeroNodes = (originalNodes: Node[]): Node[] => {
        return originalNodes.map((node) => ({
            ...node,
            from: node.from - 1,
            to: node.to - 1,
        }));
    };

    useEffect(() => {
        console.log(graph);
    }, [graph]);

    return totalNodes === 0 ? (
        <Box>
            <Typography>Alegeți numărul de vârfuri</Typography>
            <FormControl size='small' sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Numărul de vârfuri...</InputLabel>
                <Select
                    value={totalNodes}
                    label='Numărul de vârfuri...'
                    onChange={onTotalNodesChange}>
                    {Array(10)
                        .fill(0)
                        .map((_, index) => (
                            <MenuItem key={index} value={index + 1}>
                                {index + 1}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </Box>
    ) : (
        <Box>
            <Typography>Legături</Typography>
            {graph.map((node, index) => (
                <NodeComponent
                    key={index}
                    node={node}
                    index={index}
                    remove={onRemove}
                    change={onChange}
                    totalNodes={totalNodes}
                />
            ))}
            <Button
                sx={{ m: 1 }}
                color='success'
                variant='outlined'
                onClick={onAdd}
                startIcon={<AddCircleOutlineRoundedIcon />}>
                Adaugă legătură
            </Button>
            <Button
                sx={{ m: 1 }}
                color='warning'
                variant='outlined'
                onClick={onReset}
                startIcon={<RestartAltRoundedIcon />}>
                Resetează
            </Button>
            <Button
                disabled={!canSubmit()}
                sx={{ m: 1 }}
                color='error'
                variant='outlined'
                onClick={onSubmit}
                startIcon={<RunCircleOutlinedIcon />}>
                Rulează algoritm
            </Button>
        </Box>
    );
};

export default App;
