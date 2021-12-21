export const forDelay: (timout: number) => Promise<void> = (timout: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), timout);
    });
};
