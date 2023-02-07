const isEmailValide = (email) => {
    if (email.split('').includes('@')) return true;
    else return false;
};

const isPswValide = (psw) => {
    if (psw.length >= 8) return true;
    else return false;
};

const isLogin = () => {
    const data = localStorage.getItem('access_token');

    if (data === null) return false;
    else return true;
};

module.exports = { isEmailValide, isPswValide, isLogin };
