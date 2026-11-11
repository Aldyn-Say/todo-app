import { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodoStats } from './TodoStats';

export default function App() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (text) => {
        const newTask = {
            id: Date.now().toString(),
            text: text,
            completed: false,
            createdAt: new Date().toLocaleDateString('ru-RU')
        };
        setTasks([newTask, ...tasks]);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const clearCompleted = () => {
        setTasks(tasks.filter(task => !task.completed));
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
        if (filter === 'active') return matchesSearch && !task.completed;
        if (filter === 'completed') return matchesSearch && task.completed;
        return matchesSearch;
    });

    return (
        <div className="app-container">
            <h1>Менеджер задач</h1>
            
            <TodoStats tasks={tasks} clearCompleted={clearCompleted} />
            
            <TodoForm addTask={addTask} />

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

            <TodoList tasks={filteredTasks} toggleTask={toggleTask} />
        </div>
    );
}