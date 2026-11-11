export const TodoList = ({ tasks, toggleTask }) => {
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
                            onChange={() => toggleTask(task.id)} 
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