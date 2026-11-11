export const TodoStats = ({ tasks, clearCompleted }) => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;

    return (
        <div className="stats">
            <p>Всего: {total} | Активных: {active} | Выполнено: {completed}</p>
            {completed > 0 && (
                <button onClick={clearCompleted}>Очистить выполненные</button>
            )}
        </div>
    );
};