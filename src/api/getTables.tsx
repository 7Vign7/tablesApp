import axios from 'axios';
import type {Tables} from "../types/api/api.ts";
export const getTables = async () =>
    (await axios.get<Tables[]>("http://localhost:3007/tablesData")).data;