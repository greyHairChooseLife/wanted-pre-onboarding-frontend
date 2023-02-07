import { isEmailValide, isPswValide, isLogin } from '../utils/total';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'https://pre-onboarding-selection-task.shop/';

const Signin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (isLogin()) navigate('/todo');
    }, []);

    const [retryMsg, setRetryMsg] = useState('');
    const [email, setEmail] = useState('');
    const [emailFeedback, setEmailFeedback] = useState(
        '이메일 입력란에 "@"를 포함 해 주세요.'
    );
    const [psw, setPsw] = useState('');
    const [pswFeedback, setPswFeedback] = useState(
        '비밀번호를 8자 이상으로 만들어주세요.'
    );

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePsw = (e) => {
        setPsw(e.target.value);
    };

    useEffect(() => {
        if (!isEmailValide(email)) {
            setEmailFeedback('이메일 입력란에 "@"를 포함 해 주세요.');
        } else setEmailFeedback('');

        if (!isPswValide(psw)) {
            setPswFeedback('비밀번호를 8자 이상으로 만들어주세요.');
        } else setPswFeedback('');
    }, [email, psw]);

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(
                API + 'auth/signin',
                JSON.stringify({
                    email: email,
                    password: psw,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (result.status === 200) {
                const key = Object.keys(result.data)[0];
                const value = result.data[key];
                localStorage.setItem(
                    key,
                    typeof value === 'string' ? value : JSON.stringify(value) //	just in case
                );

                navigate('/todo');
            }
        } catch (err) {
            setRetryMsg(err.response.data.message);
        }
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
                    type="text"
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
