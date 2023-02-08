import { isLogin } from '../utils/total';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'https://pre-onboarding-selection-task.shop/';

const Todo = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const myToken = localStorage.getItem('access_token');

    useEffect(() => {
        if (!isLogin()) navigate('/signin');
        else {
            const config = {
                headers: {
                    Authorization: `Bearer ${myToken}`,
                },
            };

            axios
                .get(API + 'todos', config)
                .then((res) => setTodos(res.data))
                .catch((err) => console.log(err));
        }
    }, []);

    const onClickNewTodo = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${myToken}`,
                'Content-Type': 'application/json',
            },
        };
        axios
            .post(
                API + 'todos',
                {
                    todo: newTodo,
                },
                config
            )
            .then((res) => console.log(res));
    };

    const onChangeNewTodoInput = (e) => setNewTodo(e.target.value);

    const onChangeTodoCheckbox = (_, idx) => {
        const target = todos[idx];
        const effectedTarget = {
            ...target,
            isCompleted: !target.isCompleted,
        };
        const effectedTodos = todos.map((originE, originIndex) => {
            if (originIndex === idx) return effectedTarget;
            else return originE;
        });
        setTodos(effectedTodos);
    };

    return (
        <>
            <h1>to do</h1>
            {todos.map((e, idx) => {
                return (
                    <li key={idx}>
                        <label>
                            <input
                                type="checkbox"
                                checked={e.isCompleted}
                                onChange={(e) => onChangeTodoCheckbox(e, idx)}
                            />
                            <span>{e.todo}</span>
                        </label>
                    </li>
                );
            })}

            <div>
                <input
                    data-testid="new-todo-input"
                    value={newTodo}
                    onChange={onChangeNewTodoInput}
                />
                <button
                    data-testid="new-todo-add-button"
                    onClick={onClickNewTodo}
                >
                    추가
                </button>
            </div>
        </>
    );
};

export default Todo;
