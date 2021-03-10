import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Cell} from "../../../types/game";
import {getCellIdx} from "../../../helpers/cellHelpers";

export const slice = createSlice({
    name: 'animation',
    initialState: {
        cellsWithValues: [] as Cell[],
        width: 0
    },
    reducers: {
        setCellsWithValues: (state, action) => {
            state.cellsWithValues = action.payload;
        },
        addCellsWithValues: (state, action: PayloadAction<Cell>) => {
            state.cellsWithValues = [...state.cellsWithValues, action.payload]
        },
        changeAnimationCell: (state, action: PayloadAction<Cell[]>) => {
            const idx = getCellIdx(state.cellsWithValues, action.payload[0])
            if (state.cellsWithValues[idx]) {
                state.cellsWithValues[idx] = action.payload[1]
            }
        },

        setWidth: (state, action: PayloadAction<number>) => {
            state.width = action.payload
        },
    },
});

export const {
    setCellsWithValues, addCellsWithValues, setWidth,
    changeAnimationCell,
} = slice.actions;

export const selectAnimatedCells = state => state.animation.cellsWithValues;
export const selectWidth = state => state.animation.width;
export default slice.reducer;
