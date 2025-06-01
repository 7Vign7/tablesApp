import type {Row} from "./table.d.ts";
export type PropsInputFactory = {
    maxInput: number;
    minInput: number;
}
export type propsFactoryComponent = {
    key?: number
    fieldNumber: number
}
export type PropsRow = {
    key: string;
    rowData: Row;
}
export type RangeFiveToFifteen = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
