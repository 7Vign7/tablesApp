import axios from 'axios';
import type {Row} from "../types/api/api.ts";
export const getTables = async () => (await axios.get<Row[]>("http://localhost:3007/tablesData")).data;