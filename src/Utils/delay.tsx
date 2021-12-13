export const delay: (timout: number) => Promise<void> = (timout: number) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => resolve(), timout);
    });
};
