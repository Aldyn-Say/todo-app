import { useSelector, useDispatch } from 'react-redux';
import { selectAllTasks, selectActiveTasks, selectCompletedTasks } from './features/tasks/tasksSelectors';
import { completedCleared } from './features/tasks/tasksSlice';

export const TodoStats = () => {
    const dispatch = useDispatch();
    
    // Получаем данные через селекторы
    const total = useSelector(selectAllTasks).length;
    const active = useSelector(selectActiveTasks).length;
    const completed = useSelector(selectCompletedTasks).length;

    return (
        <div className="stats">
            <p>Всего: {total} | Активных: {active} | Выполнено: {completed}</p>
            {completed > 0 && (
                <button onClick={() => dispatch(completedCleared())}>
                    Очистить выполненные
                </button>
            )}
        </div>
    );
};