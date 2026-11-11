import { useState } from 'react';

export const TodoForm = ({ addTask }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            addTask(text);
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