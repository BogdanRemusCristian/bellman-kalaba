import { ReactElement, useContext } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import { makeStyles } from '@mui/styles';

import { StateContext } from '../Utils/state.provider';
import { LastColumn } from '../Models/last-column.model';
import { MatrixComponent } from './matrix.component';

const useClasses = makeStyles(() => ({
    container: {
        background: '#2a2a2b',
        padding: 10,
        borderRadius: 4,
        flex: 1,
        color: 'white',
        borderColor: 'white',
        height: '100%',
        overflow: 'hidden',
        overflowX: 'scroll',
        marginLeft: 10,
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
    column: {
        display: 'flex',
        flexDirection: 'row',
        maxHeight: 'max-content',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginTop: 10,
    },
    equal: {
        margin: 'auto 10px',
        maxHeight: 'max-content',
        fontSize: '2.7rem',
        fontWeight: 'bold',
        fontFamily: 'Verdana',
    },
}));

export const ResultsComponent: React.FC<{}> = (): ReactElement => {
    const { lastColumns, delay, blue, setBlue, setIsLoading, mode } = useContext(StateContext);

    const classes = useClasses();

    return (
        <Box className={classes.container}>
            <Typography className={classes.title}>
                Rezultatul rulării algoritmului pentru {mode === 'max' ? 'maxim' : 'minim'}
            </Typography>
            <Box display='flex' justifyContent='flex-start'>
                <MatrixComponent />
                {lastColumns.length > 0
                    ? lastColumns.map((column: LastColumn, i: number) => (
                          <Box className={classes.column} key={i}>
                              <Zoom in={true} style={{ transitionDelay: `${(i + 2) * delay}ms` }}>
                                  <div
                                      style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          margin: '0 0px',
                                          borderRight:
                                              (lastColumns.length - 2 === i ||
                                                  lastColumns.length - 1 === i) &&
                                              blue
                                                  ? '3px solid royalblue'
                                                  : '3px solid white',
                                          maxHeight: 'max-content',
                                          borderLeft:
                                              (lastColumns.length - 2 === i ||
                                                  lastColumns.length - 1 === i) &&
                                              blue
                                                  ? '3px solid royalblue'
                                                  : '3px solid white',
                                          borderRadius: '8px',
                                      }}>
                                      {column.value.map((element: number, j: number) => (
                                          <div
                                              key={`${i}${j}`}
                                              style={{
                                                  padding: '5px 10px',
                                                  maxHeight: 'max-content',
                                                  textAlign: 'center',
                                                  width: '50px',
                                                  height: '40px',
                                                  fontFamily: element
                                                      .toString()
                                                      .includes('Infinity')
                                                      ? 'Verdana'
                                                      : 'Arial',
                                              }}>
                                              {!element.toString().includes('Infinity')
                                                  ? element
                                                  : mode === 'max'
                                                  ? '-∞'
                                                  : '∞'}
                                          </div>
                                      ))}
                                  </div>
                              </Zoom>
                              <Zoom
                                  in={true}
                                  onEntered={() => {
                                      if (lastColumns.length - 1 === i) {
                                          setTimeout(() => {
                                              setBlue(true);
                                              setIsLoading(false);
                                          }, (i + 1) * delay);
                                      }
                                  }}
                                  style={{ transitionDelay: `${(i + 3) * delay}ms` }}>
                                  <span className={classes.equal}>
                                      {' '}
                                      {lastColumns.length - 2 === i ? '=' : ''}
                                  </span>
                              </Zoom>
                          </Box>
                      ))
                    : null}
            </Box>
        </Box>
    );
};
