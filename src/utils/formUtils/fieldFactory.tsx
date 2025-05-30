import type {PropsInputFactory} from "../../types/utils.ts";
import Field from "./component/field.tsx";
import formStore from '../../stores/formStore'
import {observer} from "mobx-react-lite";
import ButtonAddFields from "./component/ButtonAddFields.tsx";

const FieldFactory = observer((props:PropsInputFactory) => {
    const {minInput, maxInput} = props;
    const {fields,setLimitations} = formStore;
    setLimitations([minInput, maxInput]);
    return (
        <>
            {fields.map((e,i) =>{
                return (<Field key={i} fieldNumber={i} />)
            }
            )}
            <ButtonAddFields/>
        </>
    );
});

export default FieldFactory;