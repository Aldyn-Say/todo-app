import { useState } from 'react';
import { useSelector } from 'react-redux';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodoStats } from './TodoStats';
import { selectAllTasks } from './features/tasks/tasksSelectors';

export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    
    // Берем задачи из Redux
    const tasks = useSelector(selectAllTasks);

    // Фильтрация остается локальной
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
        if (filter === 'active') return matchesSearch && !task.completed;
        if (filter === 'completed') return matchesSearch && task.completed;
        return matchesSearch;
    });

    return (
        <div className="app-container">
            <h1>Менеджер задач</h1>
            
            <TodoStats />
            
            <TodoForm />

            <div className="controls">
                <input 
                    type="text" 
                    placeholder="Поиск задач..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">Все</option>
                    <option value="active">Активные</option>
                    <option value="completed">Выполненные</option>
                </select>
            </div>

            <TodoList tasks={filteredTasks} />
        </div>
    );
}