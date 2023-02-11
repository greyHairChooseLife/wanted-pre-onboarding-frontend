import { isLogin } from '../utils/total';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'https://pre-onboarding-selection-task.shop/';

const Todo = () => {
    const myToken = localStorage.getItem('access_token');
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        if (!isLogin()) navigate('/signin');
        else requestTodo();
    }, []);

    //	api 에러처리: 에러메시지를 잠시 보여준다.
    useEffect(() => {
        setTimeout(() => setApiError(''), 1_000 * 10);
    }, [apiError]);

    //	READ
    const requestTodo = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${myToken}`,
            },
        };
        axios
            .get(API + 'todos', config)
            .then((res) => setTodos(res.data))
            .catch(() =>
                setApiError(
                    'todo 목록을 확인 중 문제가 발생헀습니다. 새로고침하여 작업내용을 확인하세요.'
                )
            );
    };

    //	CREATE
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
            .catch(() => setApiError('todo를 추가하지 못했습니다.'))
            .finally(() => setNewTodo(''));
    };

    const onChangeNewTodoInput = (e) => setNewTodo(e.target.value);

    //	DELETE
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
            .catch(() =>
                setApiError(
                    '삭제 요청 중 문제가 발생했습니다. 새로고침하여 작업내용을 확인하세요.'
                )
            );
    };

    //	UPDATE
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
            .catch(() =>
                setApiError(
                    '업데이트 중 문제가 발생했습니다. 새로고침하여 변경 사항을 확인하세요.'
                )
            );
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
            .catch(() =>
                setApiError(
                    '업데이트 중 문제가 발생했습니다. 새로고침하여 변경 사항을 확인하세요.'
                )
            );
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
            {apiError.length > 0 && <div>{apiError}</div>}
        </>
    );
};

export default Todo;
