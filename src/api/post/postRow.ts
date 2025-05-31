import axios from 'axios';
import type {Row} from "../../types/table";
export const postRow = async (row: Row) => {
    await axios.post("http://localhost:3007/tableData", row)
}