import axios from 'axios';
import type {Row} from "../../types/table";
export const getLimitedTable = async (lastRow:number):Promise<Row[]> => {
   return ( await axios.get<Row[]>(`http://localhost:3007/tableData?_start=${lastRow}&_limit=15`));
}