export function definefreeze(instance: object) {
    Object.entries(Object.getOwnPropertyDescriptors(instance)).forEach(
        ([key, olddesc]) => {
            const shouldwrite = Reflect.has(olddesc, "writable");
            const descripter = {
                ...olddesc,
                configurable: false,
            };
            shouldwrite && (descripter.writable = false);
            Object.defineProperty(instance, key, descripter);
        }
    );
}
