import { useContext, ReactElement } from 'react';

import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import { makeStyles } from '@mui/styles';

import { StateContext } from '../Utils/state.provider';
import { MatrixElementComponent } from './matrix-element.component';

const useClasses = makeStyles(() => ({
    matrix: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'max-content',
        borderRight: '3px solid white',
        borderLeft: '3px solid white',
        borderRadius: '8px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginRight: '25px',
        marginTop: 10,
    },
}));

export const MatrixComponent: React.FC<{}> = (): ReactElement => {
    const { matrix, lastColumns } = useContext(StateContext);
    const classes = useClasses();

    return (
        <Zoom in={lastColumns?.length > 0 && matrix?.length > 0} unmountOnExit>
            <Box className={classes.matrix}>
                {matrix.map((row: number[], i: number) => (
                    <Box display='flex' key={i}>
                        {row.map((element, j: number) => (
                            <MatrixElementComponent
                                i={i}
                                j={j}
                                element={element}
                                key={`${i}${j}`}
                            />
                        ))}
                    </Box>
                ))}
            </Box>
        </Zoom>
    );
};
