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
    toggleModal = () => {
        // console.log(this.isOpen)
        // switch(this.isOpen){
        //     case false:
        //         this.isOpen = true
        //         break;
        //     case true:
        //         this.isOpen = false
        //         this.resetForm()
        // }
        this.isOpen = true
    };
    // test = () => {
    //     this.isOpen = true
    // }

    // Сброс формы
    resetForm = () => {
        this.fields = Array(5).fill("");
        this.errors = [];
        this.isOpen = false;
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