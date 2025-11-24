exports.generateRandomPassword = (length = 6) => {
    const chars = '0123456789';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    
    return password;
};