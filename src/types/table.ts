import type {Range5to15} from "./utils.ts";

export type Row = {
    id?: number
    numberOfFields: Range5to15;
    fields: string[]
}