import type {Range5to15} from "./utils.ts";

export type Row = {
    id: string
    numberOfFields: Range5to15;
    fields: string[]
}