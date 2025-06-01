import {useEffect} from "react";
import tableStore from "./stores/tableStore.tsx";
import TableVign from "./components/table/table.tsx";

const App = () =>{
  const {getTable} = tableStore
  useEffect(() => {
      getTable()
  }, []);
  return (
          <TableVign/>
  )
}

export default App
