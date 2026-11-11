import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { taskAdded } from './features/tasks/tasksSlice';

export const TodoForm = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(taskAdded(text)); // Отправляем экшен в Redux
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Что нужно сделать?" 
            />
            <button type="submit">Добавить</button>
        </form>
    );
};