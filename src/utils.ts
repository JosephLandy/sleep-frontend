

export function range(a: number, b: number): number[] {
    let out = new Array(b - a);
    for (let i = 0; i < out.length; i++) {
        out[i] = a + i;
    }
    return out;
}