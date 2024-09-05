export function transformObjectToArray(obj: Record<number, boolean>): number[] {
    return Object.keys(obj)
        .filter(key => obj[+key]) // Filter keys where the value is true
        .map(Number) // Convert keys from string to number
}
