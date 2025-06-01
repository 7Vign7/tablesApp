import type {Row} from "../types/table.d.ts";
import type {Range5to15} from "../types/utils.d.ts";

export function checkMaxNumberOfFields(nowMaxNumberOfFields:Range5to15,table:Row[]):Range5to15{
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