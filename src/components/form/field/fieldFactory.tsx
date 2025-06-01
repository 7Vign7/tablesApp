import type {PropsInputFactory} from "../../../types/utils.d.ts";
import Field from "./field.tsx";
import formStore from '../../../stores/formStore.tsx'
import {observer} from "mobx-react-lite";
import ButtonAddFields from "../button/ButtonAddFields.tsx";

const FieldFactory = observer((props:PropsInputFactory) => {
    const {minInput, maxInput} = props;
    const {fields,setLimitations} = formStore;
    setLimitations([minInput, maxInput]);
    return (
        <>
            {fields.map((_, i) => (<Field key={i} fieldNumber={i} />))}
            <ButtonAddFields/>
        </>
    );
});

export default FieldFactory;