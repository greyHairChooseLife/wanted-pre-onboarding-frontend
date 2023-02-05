const isEmailValide = (email) => {
    if (email.split('').includes('@')) return true;
    else return false;
};

const isPswValide = (psw) => {
    if (psw.length >= 8) return true;
    else return false;
};

module.exports = { isEmailValide, isPswValide };
