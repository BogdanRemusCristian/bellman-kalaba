export class Node {
    from: number;
    to: number;
    distance: number;

    constructor(from: number, to: number, distance: number) {
        this.from = from;
        this.to = to;
        this.distance = distance;
    }
}
