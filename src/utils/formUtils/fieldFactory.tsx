import type {PropsInputFactory} from "../../types/utils.ts";
import FieldComponent from "./fieldComponent.tsx";
import formStore from '../../stores/formStore'
import {observer} from "mobx-react-lite";
import ButtonAddFields from "./ButtonAddFields.tsx";

const FieldFactory = observer((props:PropsInputFactory) => {
    const {minInput, maxInput} = props;
    const {fields,setLimitations} = formStore;
    setLimitations([minInput, maxInput]);
    return (
        <>
            {fields.map((e,i) =>{
                return (<FieldComponent key={i} fieldNumber={i} />)
            }
            )}
            <ButtonAddFields/>
        </>
    );
});

export default FieldFactory;