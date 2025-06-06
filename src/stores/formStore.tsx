import { makeAutoObservable } from "mobx";
import type {FormType} from "../types/form"
import {postRow} from "../api/post/postRow.ts";
import type {RangeFiveToFifteen} from "../types/table";

type fieldsType = FormType['fields']
type errorsType = FormType['errors']
type isOpenType = FormType['isOpen']
type limitationsType = FormType['limitations']

class FormStore {
    fields: fieldsType = Array(5).fill("");
    errors: errorsType = {};
    isOpen: isOpenType = false;
    limitations: limitationsType = [0,Infinity];

    constructor() {
        makeAutoObservable(this);
    }
    //Установка лимита для полей, решил добавить, вдруг приложение нужно расширять
    setLimitations = (limit:limitationsType)=> {
        this.limitations = limit
    }
    // Открытие/закрытие модалки
    openingSwitchModal = () => {
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
        this.errors = {};
        this.isOpen = false;
        this.limitations = [0, Infinity];
    };
    // Изменение поля
    setFieldValue = (index: number, value: string) => {
        this.fields[index] = value;
        this.validateField(index);
    };
    // Добавление поля
    addFields = () => {
        if (this.fields.length < 15) {
            this.fields.push("");
        }
    }
    // Удаление поля
    deleteFields = (fieldNumber:number) => {
        this.fields.splice(fieldNumber,1)
    }
    // // Валидация
    validateField = (index: number) => {
        if (!this.fields[index]?.trim()) {
            this.errors[index] = "Поле обязательно";
        } else if (this.fields[index].length < 3) {
            this.errors[index] = "Минимум 3 символа";
        } else {
            delete this.errors[index];
        }
    };
    //Проверка всей формы
    get isValid() {
        return this.fields.every(f => f.trim() !== "") && Object.values(this.errors).length === 0;
    }
    //Отправка формы
    sendingTheForm = async () =>{
        try {
            await postRow({
                "numberOfFields": this.fields.length as RangeFiveToFifteen,
                "fields": this.fields
            })
            this.resetForm()
        }catch (error){
            console.error(error)
        }
    }
}

export default new FormStore();