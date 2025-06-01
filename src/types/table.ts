import type {Range5to15} from "./utils.ts";
import tableStore from "../stores/tableStore.tsx"
export type Row = {
    id?: string
    numberOfFields: Range5to15;
    fields: string[]
}
export type TableStore = typeof tableStore