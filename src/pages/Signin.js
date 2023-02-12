import { isEmailValide, isPswValide, isLogin } from '../utils/total';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'https://pre-onboarding-selection-task.shop/';
const INVALID_EMAIL_MSG = '이메일 입력란에 "@"를 포함 해 주세요.';
const INVALID_PSW_MSG = '비밀번호를 8자 이상으로 만들어주세요.';

const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailFeedback, setEmailFeedback] = useState(INVALID_EMAIL_MSG);
    const [psw, setPsw] = useState('');
    const [pswFeedback, setPswFeedback] = useState(INVALID_PSW_MSG);
    const [retryMsg, setRetryMsg] = useState('');

    useEffect(() => {
        if (isLogin()) navigate('/todo');
    }, [navigate]);

    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePsw = (e) => setPsw(e.target.value);

    useEffect(() => {
        if (!isEmailValide(email)) {
            setEmailFeedback(INVALID_EMAIL_MSG);
        } else setEmailFeedback('');

        if (!isPswValide(psw)) {
            setPswFeedback(INVALID_PSW_MSG);
        } else setPswFeedback('');

        setRetryMsg('');
    }, [email, psw]);

    const onSubmitLogin = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        axios
            .post(
                API + 'auth/signin',
                JSON.stringify({
                    email: email,
                    password: psw,
                }),
                config
            )
            .then((res) => {
                if (res.status === 200) {
                    const key = Object.keys(res.data)[0];
                    const value = res.data[key];
                    localStorage.setItem(
                        key,
                        typeof value === 'string'
                            ? value
                            : JSON.stringify(value) //	just in case
                    );

                    navigate('/todo');
                }
            })
            .catch((err) => setRetryMsg(err.response.data.message));
    };

    return (
        <>
            <h1>로그인</h1>
            <form onSubmit={onSubmitLogin} method="POST">
                <label>이메일</label>
                <input
                    type="text"
                    name="email"
                    placeholder="이메일"
                    value={email}
                    onChange={onChangeEmail}
                    data-testid="email-input"
                />
                <span className="inputFeedback">{emailFeedback}</span>
                <label>비밀번호</label>
                <input
                    type="password"
                    name="psw"
                    placeholder="비밀번호"
                    value={psw}
                    onChange={onChangePsw}
                    data-testid="password-input"
                />
                <span className="inputFeedback">{pswFeedback}</span>
                <div className="formFooter">
                    {emailFeedback === '' && pswFeedback === '' ? (
                        <button data-testid="signin-button">로그인</button>
                    ) : (
                        <button data-testid="signin-button" disabled>
                            로그인
                        </button>
                    )}
                </div>
            </form>
            <div>{retryMsg && retryMsg + ' 다시 시도 해 주세요.'}</div>
        </>
    );
};

export default Signin;
