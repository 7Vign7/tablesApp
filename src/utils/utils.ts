import type {Row} from "../types/table.d.ts";
import type {RangeFiveToFifteen} from "../types/utils.d.ts";

export function checkMaxNumberOfFields(nowMaxNumberOfFields:RangeFiveToFifteen, table:Row[]):RangeFiveToFifteen{
        let newMaxNumberOfFields = nowMaxNumberOfFields;
        for (const NumberOfFields of table) {
            if (NumberOfFields.numberOfFields === 15) {
                return NumberOfFields.numberOfFields;
            }
            if(NumberOfFields.numberOfFields > newMaxNumberOfFields) {
                newMaxNumberOfFields = NumberOfFields.numberOfFields;
            }
        }
        return newMaxNumberOfFields;
}