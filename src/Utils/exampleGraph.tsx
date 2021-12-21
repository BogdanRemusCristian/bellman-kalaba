import { Path } from '../Models/path.model';

export const exampleGraph: Path[] = [
    new Path(1, 2, 5),
    new Path(1, 3, 3),
    new Path(1, 4, 7),
    new Path(2, 3, 2),
    new Path(2, 5, 4),
    new Path(3, 5, 6),
    new Path(3, 6, 5),
    new Path(4, 3, 1),
    new Path(4, 6, 8),
    new Path(5, 6, 4),
    new Path(5, 7, 10),
    new Path(6, 7, 9),
];

// Negative costs
export const exampleGraph2: Path[] = [
    new Path(1, 2, 1),
    new Path(1, 4, 2),
    new Path(2, 3, 4),
    new Path(3, 4, -1),
    new Path(3, 5, 8),
    new Path(4, 5, 3),
    new Path(4, 3, 2),
    new Path(4, 5, 3),
];
