import { makeAutoObservable, runInAction } from "mobx";
import {getLimitedTable} from "../api/get/getLimitedTable.tsx";
import type {Row} from "../types/table"
import {checkMaxNumberOfFields} from "../utils/utils.ts";

export class TableStore {
    table: Row[] = []
    isLoading: boolean = false;
    lastRow = 0;
    maxNumberOfFields:Row["numberOfFields"] = 5
    notNewRow = false;
    constructor() {
        makeAutoObservable(this);
    }

    private updateMaxNumberOfFields(newRows: Row[]){
        if(this.maxNumberOfFields !== 15){
            this.maxNumberOfFields = checkMaxNumberOfFields(this.maxNumberOfFields,newRows) //подумать куда грамотнее это можно засунуть, а то какой-то калхоз
        }
    }

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
        }
        finally {
            this.isLoading = false;
        }
    }
    checkNewRow = async () =>{
        const res = await getLimitedTable(this.lastRow)
        this.notNewRow = res.length === 0
        console.log(this.notNewRow)
    }
}

export default new TableStore();