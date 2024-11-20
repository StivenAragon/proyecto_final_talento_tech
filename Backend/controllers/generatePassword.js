export default function generatePassword() {
    const length = 12;
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*()-_=+[]{}|;:',.<>?/";

    const ensureLowercase = lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
    const ensureUppercase = uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
    const ensureNumber = numbers[Math.floor(Math.random() * numbers.length)];
    const ensureSpecial = specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

    const allCharacters = lowercaseLetters + uppercaseLetters + numbers + specialCharacters;

    let password = ensureLowercase + ensureUppercase + ensureNumber + ensureSpecial;

    for (let i = password.length; i < length; i++) {
        password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}