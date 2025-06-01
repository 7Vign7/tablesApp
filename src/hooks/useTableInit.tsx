import { useEffect } from "react";
import tableStore from "../stores/tableStore";

export const useTableInit = () => {
    const { getTable } = tableStore;
    useEffect(() => {
        getTable();
    }, []);
};
