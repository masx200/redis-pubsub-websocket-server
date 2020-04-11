import { formaterror } from "./format-error";
export default function (error) {
    let reason = String(error).split("\n").join("");
    let stack = formaterror(error);
    return { stack, error: reason, type: "error" };
}
