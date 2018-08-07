const isPassword = (pass) => {
    if (!pass) {
        return false
    }
    // eslint-disable-next-line
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(String(pass).toLowerCase());
};

export default isPassword