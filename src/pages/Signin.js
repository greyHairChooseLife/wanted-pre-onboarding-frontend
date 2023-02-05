import { isEmailValide, isPswValide } from '../utils/validator';
import { useState, useEffect } from 'react';

const Signup = () => {
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

    return (
        <>
            <h1>로그인</h1>
            <form method="POST">
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
        </>
    );
};

export default Signup;
