### 🎒 About Maria
A library to fetch from the Schulportal, a website used by students and teachers in Hessen, Germany.

### 🚀 Quick Start
```bash
npm i maria-hessen
```

### 📚 Features
- Handle authentication / Session Management
- Fetch representative teacher plan
- Fetch homework on the "Mein Unterricht" (My Lessons) page"

### 🛠️ Usage
1. Get your school's name and city from the login page.
```js
const maria = new Maria({
    auth: {
        username: "max.mustermann",
        password: "secure-password",
        school: {
            name: "Mosaikschule",
            city: "Frankfurt a. M.",
        },
    },
});