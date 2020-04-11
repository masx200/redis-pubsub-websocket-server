export function formaterror(error) {
    var _a, _b;
    return ((_b = (_a = error.stack) === null || _a === void 0 ? void 0 : _a.split("\n").map((s) => s.trim()).filter(Boolean)) !== null && _b !== void 0 ? _b : []);
}
