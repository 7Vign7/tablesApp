import formStore from "../stores/formStore.tsx";

export type FormType = {
    fields: string[];
    errors: Record<number, string>;
    isOpen: boolean;
    limitations: [number,number];
}
export type FormStore = typeof formStore