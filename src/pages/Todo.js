const Todo = () => {
    const data = localStorage.getItem('access_token');

    console.log('localStorage with access_token: ', data);
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
