import { makeAutoObservable, runInAction } from "mobx";
import {getLimitedTable} from "../api/get/getLimitedTable.tsx";
import type {Row} from "../types/table"

class TableStore {
    table: Row[] = []
    isLoading: boolean = false;
    lastRow = 0;
    maxNumberOfFields:Row["numberOfFields"] = 5
    notNewRow = false;
    constructor() {
        makeAutoObservable(this);
    }
    //Обновляем максимальное кол. полей в таблице
    private updateMaxNumberOfFields(newRows: Row[]){
        if(this.maxNumberOfFields >= 15) return;
        for (const NumberOfFields of newRows) {
            if (NumberOfFields.numberOfFields === 15) {
                this.maxNumberOfFields = NumberOfFields.numberOfFields;
            }
            if(NumberOfFields.numberOfFields > this.maxNumberOfFields ){
                this.maxNumberOfFields  = NumberOfFields.numberOfFields;
            }
        }
    }
    //сброс формы
    resetTable () {
        this.table = []
        this.isLoading = false;
        this.lastRow = 0;
        this.maxNumberOfFields = 5
        this.notNewRow = false;
    }
    //Получаем таблицу
    getTable= async ()=>{
        if(this.isLoading)return;
        try{
            this.isLoading = true;
            const res:Row[] = await getLimitedTable(this.lastRow)
            const newTable = [...this.table,...res];
            runInAction(()=>{
                if(res.length === 0){
                    this.notNewRow = true;
                    return;
                }
                this.table = newTable
                this.lastRow = this.table.length;
                this.updateMaxNumberOfFields(res);
            })
        }
        catch(error){
            console.error(`Что-то не так с сервером:( Ошибка:${error}`)
        }finally {
            this.isLoading = false;
        }

    }
    //Проверяем появились ли новые компоненты, если да то записываем последнюю новую строку
    checkNewRow = async () =>{
        const res = await getLimitedTable(this.lastRow)
        this.notNewRow = res.length === 0
    }
}

export default new TableStore();