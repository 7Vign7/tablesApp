import axios from 'axios';
import { getLimitedTable } from '../api/get/getLimitedTable';
import type { Row } from "../types/table";

    jest.mock('axios');
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    describe('getLimitedTable', () => {
        const testData: Row[] = [
            {
                id: "1",
                numberOfFields: 7,
                fields: [
                    "кофе",
                    "чай",
                    "сок",
                    "вода",
                    "молоко",
                    "лимонад",
                    "вино"
                ]
            },
            {
                id: "2",
                numberOfFields: 12,
                fields: [
                    "январь",
                    "февраль",
                    "март",
                    "апрель",
                    "май",
                    "июнь",
                    "июль",
                    "август",
                    "сентябрь",
                    "октябрь",
                    "ноябрь",
                    "декабрь"
                ]
            },
            {
                id: "3",
                numberOfFields: 5,
                fields: [
                    "яблоко",
                    "груша",
                    "слива",
                    "вишня",
                    "персик"
                ]
            }
        ];

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('должен сделать правильный запрос API и вернуть данные', async () => {
            const lastRow = 0;
            const expectedUrl = `http://localhost:3007/tableData?_start=${lastRow}&_limit=15`;

            mockedAxios.get.mockResolvedValue({ data: testData });

            const result = await getLimitedTable(lastRow);

            expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl);
            expect(result).toEqual(testData);
        });

        it('следует ли правильно использовать другой параметр lastRow', async () => {
            const lastRow = 10;
            const expectedUrl = `http://localhost:3007/tableData?_start=${lastRow}&_limit=15`;

            mockedAxios.get.mockResolvedValue({ data: testData });

            const result = await getLimitedTable(lastRow);

            expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl);
            expect(result).toEqual(testData);
        });

        it('должен обрабатывать пустой ответ', async () => {
            const lastRow = 600;
            mockedAxios.get.mockResolvedValue({ data: [] });

            const result = await getLimitedTable(lastRow);

            expect(result).toEqual([]);
        });

        it('должен обрабатывать ошибки API', async () => {
            const lastRow = 0;
            mockedAxios.get.mockRejectedValue(new Error('API Error'));

            await expect(getLimitedTable(lastRow)).rejects.toThrow('API Error');
        });

        it('должен обрабатывать сетевые ошибки', async () => {
            const lastRow = 0;
            mockedAxios.get.mockRejectedValue(new Error('Network Error'));

            await expect(getLimitedTable(lastRow)).rejects.toThrow('Network Error');
        });
    });