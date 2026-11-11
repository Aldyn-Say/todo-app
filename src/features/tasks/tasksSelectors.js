export const selectAllTasks = (state) => state.tasks.items;

export const selectActiveTasks = (state) => 
    state.tasks.items.filter(task => !task.completed);

export const selectCompletedTasks = (state) => 
    state.tasks.items.filter(task => task.completed);