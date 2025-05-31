import {useEffect} from "react";
import tableStore from "./stores/tableStore.tsx";
import TableVign from "./components/table/table.tsx";
import ModalForm from "./components/form/modalForm.tsx";
import {Box} from "@mui/material";

const App = () =>{
  const {getTable} = tableStore
  useEffect(() => {
      getTable()
  }, []);
  return (
      <Box>
          <ModalForm/>
          {/*<TableVign/>*/}
      </Box>
  )
}

export default App
