import tableStore from "../stores/tableStore.tsx"
export type RangeFiveToFifteen = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export type Row = {
    id?: string
    numberOfFields: RangeFiveToFifteen;
    fields: string[]
}
export type TableStore = typeof tableStore
