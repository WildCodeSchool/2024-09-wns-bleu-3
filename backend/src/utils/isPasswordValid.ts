export const isPasswordValid = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)){
        throw new Error('Password must include 8+ chars, uppercase, lowercase, number, and special character.');
    }
}