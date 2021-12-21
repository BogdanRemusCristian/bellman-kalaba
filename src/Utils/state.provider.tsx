import { FC, useState, useEffect, createContext, ReactElement } from 'react';
import { LastColumn } from '../Models/last-column.model';
import { Path } from '../Models/path.model';
import { forDelay } from './delay';
import { exampleGraph, exampleGraph2 } from './exampleGraph';

export const StateContext = createContext<{ [k: string]: any }>({});

export const StateContextProvider: FC<{}> = ({ children }): ReactElement => {
    const [totalPaths, setTotalPaths] = useState(7);
    const [example, setExample] = useState('ex1');
    const [graph, setGraph] = useState<Path[]>(exampleGraph);
    const [lastColumns, setLastColumns] = useState<LastColumn[]>([]);
    const [matrix, setMatrix] = useState<number[][]>([]);
    const [blue, setBlue] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mode, setMode] = useState<'min' | 'max'>('max');
    const [delay, setDelay] = useState(1000);

    const onPathAdd = (): void => {
        const path = new Path(0, 0, 0);
        setGraph((oldGraph) => [...oldGraph, path]);
    };

    const onPathRemove = (i: number) => {
        setGraph((oldGraph) => oldGraph.filter((_, index) => i !== index));
    };

    const onPathChange = (i: number, name: string, value: number): void => {
        setGraph((oldGraph) =>
            oldGraph.map((path, index) => {
                if (i !== index) return path;
                return {
                    ...path,
                    [name]: value,
                };
            })
        );
    };

    const onTotalPathsChange = (e: any) => {
        setTotalPaths(e.target.value);
        const paths = Array<Path>(4).fill(new Path(0, 0, 0));
        setGraph(paths);
    };

    const onModeChange = (e: any) => {
        setMode(e.target.value);
    };

    const onExampleChange = (e: any) => {
        const example = e.target.value;
        setExample(example);
        if (example === 'ex2') {
            setTotalPaths(5);
            setGraph(exampleGraph2);
        } else {
            setTotalPaths(7);
            setGraph(exampleGraph);
        }
        setMatrix([]);
        setLastColumns([]);
    };

    const onReset = () => {
        setTotalPaths(0);
        setGraph([]);
        setMatrix([]);
        setLastColumns([]);
    };

    const onSubmit = async () => {
        // Remove all unnecesary data
        setBlue(false); // color blue on last 2 columns
        setMatrix([]);
        setLastColumns([]);
        setIsLoading(true);
        // wait for 500ms
        await forDelay(500);
        // reduce graph to 0 based if starting from another vertex (not done for others yet)
        const paths = reduceToZeroPaths(graph);
        // Get the matrix for the current graph
        const matrix = generateMatrix(paths);
        // clone the "first" last column
        const lastColumn = cloneLastColumn(matrix);
        // set the matrix and last column
        setMatrix(matrix);
        setLastColumns([lastColumn]);
    };

    const areEqual = (first: LastColumn, last: LastColumn): boolean => {
        // In case we don't have yet 2 rows, just skip
        if (!first || !last) return false;
        // Checks every value by index in last 2 columns are the same
        return first.value.reduce((areEqual: boolean, element: number, index: number) => {
            if (element !== last.value[index]) areEqual = false;
            return areEqual;
        }, true);
    };

    const cloneLastColumn = (matrix: number[][]): LastColumn => {
        // Temporary column, array of numbers, empty
        const lastColumn: number[] = [];
        // Get only last value from each row
        matrix.forEach((row) => {
            lastColumn.push(row[row.length - 1]);
        });
        // return the new column
        return new LastColumn(lastColumn);
    };

    // Minimum or maximum
    const getLastColumn = (lastColumn: LastColumn): LastColumn => {
        // Temporary column, array of numbers, empty
        const lastColumnReturned: number[] = [];
        // Do the sums for all rows
        matrix.forEach((row) => {
            // Temporary sums, array of numbers, empty at start of iteration
            const allValues: number[] = [];
            // Do the sums for the line + last column
            lastColumn.value.forEach((value, j: number) => {
                allValues.push(row[j] + value);
            });
            // Save the min or the max (base on settings)
            lastColumnReturned.push(Math[mode](...allValues));
        });
        // Generate a new column and return it
        return new LastColumn(lastColumnReturned);
    };

    const generateMatrix = (paths: Path[]) => {
        // Generate a matrix of N x N with 0 values by default
        const matrix = Array(totalPaths).fill(Array(totalPaths).fill(0));
        return matrix.map((row, i) =>
            row.map((element: number, j: number) => {
                // Main Diagonal (element = 0 by default)
                if (i === j) return element;
                // Search for a path between two nodes
                const path = paths.find((path) => path.from === i && path.to === j);
                // Put the cost if path exists, else infinity
                return path ? path.cost : mode === 'max' ? -Infinity : Infinity;
            })
        );
    };

    const canSubmit = () => {
        // Validate that all paths and their values are different than 0
        return graph.reduce((bool: boolean, path) => {
            if (path.to === 0 || path.from === 0 || path.cost === 0) {
                bool = false;
            }
            return bool;
        }, true);
    };

    const reduceToZeroPaths = (originalPaths: Path[], startVertex: number = 1): Path[] => {
        // If starting vertex is different than 1 (default 1)
        return originalPaths.map((path) => ({
            ...path,
            from: path.from - startVertex,
            to: path.to - startVertex,
        }));
    };

    useEffect(() => {
        setMatrix([]);
        setLastColumns([]);
    }, [mode]);

    useEffect(() => {
        // Get last 2 columns (not always have 2, can be just the first one)
        // In this case areEqual returns false
        const last = lastColumns[lastColumns.length - 1];
        const beforeLast = lastColumns[lastColumns.length - 2];
        // Check for equality
        if (!areEqual(last, beforeLast) && last?.value?.length > 0) {
            // If not equal, generate another lastColumn
            const latestColumn = getLastColumn(last);
            // Add the column into the array of columns to keep tracking
            setLastColumns((lastColumns) => [...lastColumns, latestColumn]);
        }
        // This effect runs until last 2 columns are equal
        // eslint-disable-next-line
    }, [lastColumns, matrix]); // Dependecies, the effect runs also if matrix changes

    return (
        <StateContext.Provider
            value={{
                lastColumns,
                totalPaths,
                isLoading,
                example,
                matrix,
                graph,
                delay,
                blue,
                mode,
                onTotalPathsChange,
                onExampleChange,
                setTotalPaths,
                onModeChange,
                onPathRemove,
                onPathChange,
                setIsLoading,
                canSubmit,
                onPathAdd,
                onSubmit,
                setDelay,
                setGraph,
                setBlue,
                onReset,
                setMode,
            }}>
            {children}
        </StateContext.Provider>
    );
};
