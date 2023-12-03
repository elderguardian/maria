<div align="center">
    <br><br>
    <img width="30%" src="https://github.com/elderguardian/maria/assets/129489839/97f0e63a-5eb4-4ed3-8144-6ea2e27f853f">
    <br><br>
    Designed to simplify.
    <br><br>
</div>

## 🎒 About Maria
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
1. Get your school's name and city from the [login page](https://login.schulportal.hessen.de/).
> [!TIP]
> Look up how the Schulportal knows your school. Sometimes the names are weird and contain locations.
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

const currentRepPlan = await maria.fetchRepPlan({});

const futureRepPlan = await maria.fetchRepPlan({
    date: new Date("18 Sep 2024"),
});
```

> [!IMPORTANT]
> This library is not officially affiliated with the "Schulportal Hessen" or "Lanis" website. It is a community-driven project created by students in their free time.
