import { useDispatch } from 'react-redux';
import { taskToggled } from './features/tasks/tasksSlice';

export const TodoList = ({ tasks }) => {
    const dispatch = useDispatch();

    if (tasks.length === 0) {
        return <p>Задач нет</p>;
    }

    return (
        <ul className="todo-list">
            {tasks.map(task => (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={task.completed} 
                            onChange={() => dispatch(taskToggled(task.id))} 
                        />
                        <span>{task.text}</span>
                    </label>
                    <small>
                        {task.completed ? ' 🟢 Выполнено' : ' 🔴 Не выполнено'} | {task.createdAt}
                    </small>
                </li>
            ))}
        </ul>
    );
};