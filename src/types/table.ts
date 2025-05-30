type Range5to15 = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export type Row = {
    id: number
    numberOfFields: Range5to15;
    fields: string[]
}