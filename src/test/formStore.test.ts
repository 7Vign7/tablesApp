import formStore from '../stores/formStore.tsx';
import { postRow } from '../api/post/postRow';
import type {FormStore} from '../types/form.ts';


jest.mock('../api/post/postRow', () => ({
    postRow: jest.fn(),
}));

describe('FormStore', () => {
    let store: FormStore;

    beforeEach(() => {
        store = formStore;
        store.resetForm()
        jest.clearAllMocks();
    });

    describe('Базовые функции', () => {
        it('должен инициализироваться с пустыми значениями', () => {
            expect(store.fields).toEqual(['', '', '', '', '']);
            expect(store.errors).toEqual({});
            expect(store.isOpen).toBe(false);
        });

        it('должен открывать/закрывать модальное окно', () => {
            store.openingSwitchModal();
            expect(store.isOpen).toBe(true);

            store.openingSwitchModal();
            expect(store.isOpen).toBe(false);
        });

        it('должен сбрасывать форму при закрытии', () => {
            store.setFieldValue(0, 'test');
            store.openingSwitchModal();
            store.openingSwitchModal();

            expect(store.fields).toEqual(['', '', '', '', '']);
        });
    });

    describe('Работа с полями формы', () => {
        it('должен устанавливать значение поля', () => {
            store.setFieldValue(0, 'new value');
            expect(store.fields[0]).toBe('new value');
        });

        it('должен добавлять новые поля (до 15)', () => {
            for (let i = 0; i < 10; i++) {
                store.addFields();
            }
            expect(store.fields.length).toBe(15);
            store.addFields(); // Попытка добавить сверх лимита
            expect(store.fields.length).toBe(15);
        });
        it('должен удалять поля', () => {
            store.addFields();
            store.deleteFields(1);
            expect(store.fields.length).toBe(5); // Возврат к исходному количеству
        });
    });

    describe('Валидация', () => {
        it('должен отмечать ошибку для пустого поля', () => {
            store.setFieldValue(0, '');
            expect(store.errors[0]).toBe('Поле обязательно');
        });

        it('должен отмечать ошибку для короткого значения', () => {
            store.setFieldValue(0, 'ab');
            expect(store.errors[0]).toBe('Минимум 3 символа');
        });

        it('должен удалять ошибку при корректном значении', () => {
            store.setFieldValue(0, '');
            store.setFieldValue(0, 'valid');
            expect(store.errors[0]).toBeUndefined();
        });

        it('должен корректно проверять валидность всей формы', () => {
            expect(store.isValid).toBe(false);

            store.fields = ['valid', 'valid', 'valid', 'valid', 'valid'];
            expect(store.isValid).toBe(true);
        });
    });

    describe('Отправка формы', () => {
        it('должен отправлять форму при валидных данных', async () => {
            store.fields = ['valid', 'valid', 'valid', 'valid', 'valid'];
            await store.sendingTheForm();

            expect(postRow).toHaveBeenCalledWith({
                "numberOfFields": 5,
                "fields": ['valid', 'valid', 'valid', 'valid', 'valid']
            });
            expect(store.isOpen).toBe(false);
        });

        it('должен обрабатывать ошибки при отправке', async () => {
            (postRow as jest.Mock).mockRejectedValue(new Error('API Error'));
            store.fields = ['valid', 'valid', 'valid', 'valid', 'valid'];

            await expect(store.sendingTheForm()).resolves.not.toThrow();
        });
    });
});