import { createSlice, nanoid } from '@reduxjs/toolkit';

// Начальное состояние (переносим из localStorage)
const initialState = {
    items: JSON.parse(localStorage.getItem('tasks')) || []
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        taskAdded: {
            reducer(state, action) {
                state.items.unshift(action.payload);
                // Сохраняем в localStorage при изменении
                localStorage.setItem('tasks', JSON.stringify(state.items));
            },
            prepare(text) {
                return {
                    payload: {
                        id: nanoid(),
                        text,
                        completed: false,
                        createdAt: new Date().toLocaleDateString('ru-RU')
                    }
                };
            }
        },
        taskToggled(state, action) {
            const task = state.items.find(t => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                localStorage.setItem('tasks', JSON.stringify(state.items));
            }
        },
        taskDeleted(state, action) {
            state.items = state.items.filter(t => t.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.items));
        },
        completedCleared(state) {
            state.items = state.items.filter(t => !t.completed);
            localStorage.setItem('tasks', JSON.stringify(state.items));
        }
    }
});

export const { taskAdded, taskToggled, taskDeleted, completedCleared } = tasksSlice.actions;
export default tasksSlice.reducer;