import { makeAutoObservable } from "mobx";
import type {FormType} from "../types/form"
import {ChangeEvent} from "react"


type fieldsType = FormType['fields']
type errorsType = FormType['errors']
type isOpenType = FormType['isOpen']
type limitationsType = FormType['limitations']

export class FormStore {
    fields: fieldsType = Array(5).fill("");
    errors: errorsType = [];
    isOpen: isOpenType = false;
    limitations: limitationsType = [0];

    constructor() {
        makeAutoObservable(this);
    }
    //установка лимита для полей, решил добавить, вдруг приложение нужно расширять
    setLimitations = (limit:limitationsType)=> {
        this.limitations = limit
    }
    // Открытие/закрытие модалки
    openingSwitchModal = () => {
        console.log(this.isOpen)
        switch(this.isOpen){
            case false:
                this.isOpen = true
                break;
            case true:
                this.isOpen = false
                this.resetForm()
        }
    };
    // Сброс формы
    resetForm = () => {
        this.fields = Array(5).fill("");
        this.errors = [];
        this.isOpen = false;
        this.limitations = [0];
    };
    // Изменение поля
    setFieldValue = (index: number, value: string) => {
        this.fields[index] = value;
        this.validateField(index);
    };

    addFields = () => {
        this.fields.push('')
    }
    //
    deleteFields = (fieldNumber:number) => {
        this.fields.splice(fieldNumber,1)
        console.log(fieldNumber)
    }
    // // Валидация
    // validateField = (index: number) => {
    //     this.errors[index] =
    //         this.fields[index].trim() === "" ? "Нужно заполнить минимум 5 полей" : '';
    // };
    //Отправка формы
    sendingTheForm = (e:ChangeEvent<HTMLInputElement>)=>{
        console.log("Sending form...",e);
        this.resetForm();
    }
    // // Проверка всей формы
    // get isValid() {
    //     return this.fields.every(f => f.trim() !== "");
    // }
}

export default new FormStore();