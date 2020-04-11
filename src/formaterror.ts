export function formaterror(error: Error) {
    return error.stack
        ?.split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
}
