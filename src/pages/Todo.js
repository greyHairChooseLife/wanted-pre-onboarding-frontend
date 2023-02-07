import { isLogin } from '../utils/total';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'https://pre-onboarding-selection-task.shop/';

const Todo = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState();

    useEffect(() => {
        if (!isLogin()) navigate('/signin');

        const myToken = localStorage.getItem('access_token');
        const config = {
            headers: {
                Authorization: `Bearer ${myToken}`,
            },
        };

        axios
            .get(API + 'todos', config)
            .then((res) => setTodos(res.data))
            .catch((err) => console.log(err));
    }, []);
    console.log('responsed todos: ', todos);

    return (
        <>
            <h1>to do</h1>
            <li>
                <label>
                    <input type="checkbox" />
                    <span>TODO 1</span>
                </label>
            </li>
            <li>
                <label>
                    <input type="checkbox" />
                    <span>TODO 2</span>
                </label>
            </li>
            <div>
                <input data-testid="new-todo-input" />
                <button data-testid="new-todo-add-button">추가</button>
            </div>
        </>
    );
};

export default Todo;
