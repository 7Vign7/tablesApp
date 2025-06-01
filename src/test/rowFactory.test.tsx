import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import RowFactory from '../components/table/row/rowFactory.tsx';
import tableStore from "../stores/tableStore";
import type {TableStore, Row} from "../types/table.d.ts";

jest.mock("../stores/tableStore", () => ({
    __esModule: true,
    default: {
        table: [],
        isLoading: false,
        notNewRow: false,
        getTable: jest.fn(),
        resetTable: jest.fn()
    }
}));
jest.mock("../components/table/row/tableRowVign.tsx", () => ({
    __esModule: true,
    default: ({ rowData }: { rowData: Row }) => (
        <div data-testid="table-row-vign" data-id={rowData.id} />
    )
}));
jest.mock("@mui/material/CircularProgress", () => (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div role="progressbar" {...props} />
));
jest.mock("@mui/material/TableRow", () => (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div role="row" {...props} />
));

describe('RowFactory Компонент', () => {
    let observer: { observe: jest.Mock; disconnect: jest.Mock };
    beforeEach(() => {
        observer = {
            observe: jest.fn(),
            disconnect: jest.fn()
        };
        global.IntersectionObserver = (() => observer) as unknown as typeof IntersectionObserver;
        (tableStore as TableStore).table = [];
        (tableStore as TableStore).isLoading = false;
        (tableStore as TableStore).notNewRow = false;
        (tableStore.getTable as jest.Mock).mockReset();
    });

    it('отображает строки таблицы', () => {
        (tableStore as TableStore).table = [
            { id: "1", fields: ['test','test','test','test','test'], numberOfFields: 5 },
            { id: "2", fields: ['test2','test2','test2','test2','test2','test2','test2','test2','test2','test2'], numberOfFields: 10 },
        ];
        render(<RowFactory />);
        expect(screen.getAllByTestId('table-row-vign')).toHaveLength(2);
    });
    it('загружает данные при появлении в viewport', async () => {
        render(<RowFactory />);

        act(() => {
            // Симулируем появление элемента в viewport
            const entries = [{ isIntersecting: true }];
            const callback = (global.IntersectionObserver as jest.Mock).mock.calls[0][0];
            callback(entries);
        });

        await waitFor(() => {
            expect(tableStore.getTable).toHaveBeenCalled();
        });
    });
    it('отписывается от observer при размонтировании', () => {
        const { unmount } = render(<RowFactory />);
        unmount();
        expect(observer.disconnect).toHaveBeenCalled();
    });
});