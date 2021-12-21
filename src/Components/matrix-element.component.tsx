import { useContext, ReactElement, useMemo } from 'react';

import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import { StateContext } from '../Utils/state.provider';

const useClasses = makeStyles(() => ({
    element: ({ element, i, j }: { element: number; j: number; i: number }) => ({
        padding: '5px 10px',
        textAlign: 'center',
        width: '50px',
        color: i === j ? 'royalblue' : 'inherit',
        maxHeight: 'max-content',
        fontFamily: element.toString().includes('Infinity') ? 'Verdana' : 'Arial',
    }),
}));

export const MatrixElementComponent: React.FC<{
    element: number;
    j: number;
    i: number;
}> = ({ element, i, j }): ReactElement => {
    const { mode } = useContext(StateContext);
    const classes = useClasses({ element, i, j });
    const elementText = useMemo(() => {
        const isInfinity = element?.toString().includes('Infinity');
        let elementText = isInfinity ? '∞' : element;
        return mode === 'max' && isInfinity ? `-${elementText}` : elementText;
    }, [element, mode]);

    return <Box className={classes.element}>{elementText}</Box>;
};
