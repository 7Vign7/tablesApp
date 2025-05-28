import { makeAutoObservable } from "mobx";
import type {FormType} from "../types/form"

export class FormStore {
    fields: FormType['fields'] = Array(5).fill("");
    errors: FormType['errors'] = [];
    isOpen: FormType['isOpen'] = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Открытие/закрытие модалки
    toggleModal = (open: boolean) => {
        this.isOpen = open;
        if (!open) this.resetForm();
    };

    // Сброс формы
    resetForm = () => {
        this.fields = Array(5).fill("");
        this.errors = [];
    };

    // Изменение поля
    setFieldValue = (index: number, value: string) => {
        this.fields[index] = value;
        this.validateField(index);
    };

    // Валидация
    validateField = (index: number) => {
        this.errors[index] =
            this.fields[index].trim() === "" ? "Нужно заполнить минимум 5 полей" : "";
    };

    // Проверка всей формы
    get isValid() {
        return this.fields.every(f => f.trim() !== "");
    }
}

export default new FormStore();