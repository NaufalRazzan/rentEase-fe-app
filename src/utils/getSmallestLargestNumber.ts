/**
 * 
 * @param str supply the prices as array of strings
 * @returns the smallest on index 0 and largest on index 1
 */

export const getSmallestLargestNumberPrice = (str: string[]): number[] => {
    const allNumbers: number[] = str.flatMap(extractNumberPrice).filter(num => Number.isFinite(num))

    if (allNumbers.length === 0) {
        return [0, 0]
    }

    const result: number[] = [
        Math.min(...allNumbers),
        Math.max(...allNumbers)
    ]

    return result
}
/**
 * 
 * @param str supply the power as array of strings
 * @returns the smallest on index 0 and largest on index 1
 */
export const getSmallestLargestNumberPower = (str:string[]): number[] => {
    const allNumbers: number[] = str.flatMap(extractNumberPower).filter(num => Number.isFinite(num))

    if (allNumbers.length === 0) {
        return [0, 0]
    }

    const result: number[] = [
        Math.min(...allNumbers),
        Math.max(...allNumbers)
    ]

    return result
}

const extractNumberPrice = (str: string): number[] => {
    return str.split(' - ').map(Number)
}

const extractNumberPower = (str: string): [number, number] => {
    const numbers = str.split(' - ').map(Number)

    return [Math.min(...numbers), Math.max(...numbers)]
}