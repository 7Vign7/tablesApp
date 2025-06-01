import tableStore from '../stores/tableStore';
import { getLimitedTable } from '../api/get/getLimitedTable';
import { checkMaxNumberOfFields } from '../utils/utils';
import type {TableStore} from "../types/table.ts";


jest.mock('../api/get/getLimitedTable');
jest.mock('../utils/utils', () => ({
    checkMaxNumberOfFields: jest.fn().mockReturnValue(10),
}));

describe('TableStore', () => {
    let store: TableStore;
    const mockData = [
        { "id": "1", "fields": ['test','test','test','test','test'], "numberOfFields": 5 },
        { "id": "2", "fields": ['test2','test2','test2','test2','test2','test2','test2','test2','test2','test2'], "numberOfFields": 10 },
    ];

    beforeEach(() => {
        tableStore.resetTable()
        store = tableStore;
        (getLimitedTable as jest.Mock).mockClear();
        (checkMaxNumberOfFields as jest.Mock).mockClear();
    });

    describe('Загрузка данных', () => {
        it('должен загружать данные и обновлять состояние', async () => {
            (getLimitedTable as jest.Mock).mockResolvedValue(mockData);

            await store.getTable();

            expect(getLimitedTable).toHaveBeenCalledWith(0);
            expect(store.table).toEqual(mockData);
            expect(store.lastRow).toBe(2);
            expect(store.isLoading).toBe(false);
        });

        it('должен обновлять maxNumberOfFields', async () => {
            (getLimitedTable as jest.Mock).mockResolvedValue(mockData);

            await store.getTable();

            expect(checkMaxNumberOfFields).toHaveBeenCalledWith(5, mockData);
            expect(store.maxNumberOfFields).toBe(10);
        });

        it('должен устанавливать notNewRow при пустом ответе', async () => {
            (getLimitedTable as jest.Mock).mockResolvedValue([]);

            await store.getTable();

            expect(store.notNewRow).toBe(true);
        });

        it('должен игнорировать вызов при уже идущей загрузке', async () => {
            store.isLoading = true;
            await store.getTable();

            expect(getLimitedTable).not.toHaveBeenCalled();
        });

        it('должен обрабатывать ошибки загрузки', async () => {
            (getLimitedTable as jest.Mock).mockRejectedValue(new Error('API Error'));
            await expect(store.getTable()).resolves.not.toThrow();
            await expect(store.isLoading).toBe(false);
        });
    });

    describe('Проверка новых строк', () => {
        it('должен обновлять notNewRow', async () => {
            (getLimitedTable as jest.Mock).mockResolvedValueOnce(mockData).mockResolvedValueOnce([]);

            await store.checkNewRow();
            expect(store.notNewRow).toBe(false);

            await store.checkNewRow();
            expect(store.notNewRow).toBe(true);
        });
    });
});