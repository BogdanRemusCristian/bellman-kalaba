export class Path {
    from: number;
    to: number;
    cost: number;

    constructor(from: number, to: number, cost: number) {
        this.from = from;
        this.to = to;
        this.cost = cost;
    }
}
