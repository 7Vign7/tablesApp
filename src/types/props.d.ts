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