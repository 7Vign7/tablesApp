import axios from 'axios';
import type {Row} from "../types/api/api.ts";
export const getTables = async (lastRow:number) => {
   return ( await axios.get<Row[]>(`http://localhost:3007/tableData?_start=${lastRow}&_limit=15`)).data;
}