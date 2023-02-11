import { isLogin } from '../utils/total';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'https://pre-onboarding-selection-task.shop/';
const myToken = localStorage.getItem('access_token');

const Todo = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        if (!isLogin()) navigate('/signin');
        else requestTodo();
    }, []);

    const requestTodo = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${myToken}`,
            },
        };
        const result = await axios.get(API + 'todos', config);
        setTodos(result.data);
    };

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
            .then(() => requestTodo())
            .catch((err) => console.log(err));

        setNewTodo('');
    };

    const onClickDeleteTodo = (idx) => {
        const id = todos[idx].id;
        const config = {
            headers: {
                Authorization: `Bearer ${myToken}`,
            },
        };
        axios
            .delete(API + `todos/${id}`, config)
            .then(() => requestTodo())
            .catch((err) => console.log(err));
    };

    const onClickUpdateTodo = (idx) => {
        const target = todos[idx];
        const effectedTarget = {
            ...target,
            isUpdating: true,
            updateValue: target.todo,
        };
        const effectedTodos = todos.map((originE, originIndex) => {
            if (originIndex === idx) return effectedTarget;
            else return originE;
        });
        setTodos(effectedTodos);
    };

    const onChangeUpdateInput = (event, idx) => {
        const target = todos[idx];
        const effectedTarget = {
            ...target,
            updateValue: event.target.value,
        };
        const effectedTodos = todos.map((originE, originIndex) => {
            if (originIndex === idx) return effectedTarget;
            else return originE;
        });
        setTodos(effectedTodos);
    };

    const onChangeNewTodoInput = (e) => setNewTodo(e.target.value);

    const onChangeTodoCheckbox = (idx) => {
        const target = todos[idx];
        const config = {
            headers: {
                Authorization: `Bearer ${myToken}`,
                'Content-Type': 'application/json',
            },
        };
        axios
            .put(
                API + `todos/${target.id}`,
                {
                    todo: target.todo,
                    isCompleted: !target.isCompleted,
                },
                config
            )
            .then(() => requestTodo())
            .catch((err) => console.log(err));
    };

    const onClickUpdateSubmit = (idx) => {
        const target = todos[idx];
        const config = {
            headers: {
                Authorization: `Bearer ${myToken}`,
                'Content-Type': 'application/json',
            },
        };
        axios
            .put(
                API + `todos/${target.id}`,
                {
                    todo: target.updateValue,
                    isCompleted: target.isCompleted,
                },
                config
            )
            .then(() => requestTodo())
            .catch((err) => console.log(err));
    };

    const onClickUpdateCancel = (idx) => {
        const target = todos[idx];
        const effectedTarget = {
            ...target,
            isUpdating: false,
            updateValue: target.todo,
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
            <div className="newTodoDiv">
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

            {todos.map((e, idx) => {
                return (
                    <li key={idx}>
                        <label>
                            <input
                                type="checkbox"
                                checked={e.isCompleted}
                                onChange={() => onChangeTodoCheckbox(idx)}
                            />
                            {!e.isUpdating ? (
                                <span>{e.todo}</span>
                            ) : (
                                <input
                                    data-testid="modify-input"
                                    value={e.updateValue}
                                    onChange={(event) =>
                                        onChangeUpdateInput(event, idx)
                                    }
                                />
                            )}
                        </label>
                        {!e.isUpdating ? (
                            <button
                                data-testid="modify-button"
                                onClick={() => onClickUpdateTodo(idx)}
                            >
                                수정
                            </button>
                        ) : (
                            <button
                                data-testid="submit-button"
                                onClick={() => onClickUpdateSubmit(idx)}
                            >
                                제출
                            </button>
                        )}
                        {!e.isUpdating ? (
                            <button
                                data-testid="delete-button"
                                onClick={() => onClickDeleteTodo(idx)}
                            >
                                삭제
                            </button>
                        ) : (
                            <button
                                data-testid="cancel-button"
                                onClick={() => onClickUpdateCancel(idx)}
                            >
                                취소
                            </button>
                        )}
                    </li>
                );
            })}
        </>
    );
};

export default Todo;
