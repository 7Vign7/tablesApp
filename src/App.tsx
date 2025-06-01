import TableVign from "./components/table/table.tsx";
import {useTableInit} from "./hooks/useTableInit";
const App = () =>{
  useTableInit()
  return <TableVign/>
}

export default App
