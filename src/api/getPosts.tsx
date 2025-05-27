import axios from 'axios';
import type {Posts} from "../types/api/api.ts";
export const getPosts = async () =>
    (await axios.get<Posts[]>("https://jsonplaceholder.typicode.com/posts")).data;