# Maria

Maria is a TypeScript library designed to simplify the process of fetching from the "Schulportal Hessen" or "Lanis" website. This library provides a convenient interface for programmatically retrieving teacher plans, making it easier for developers to integrate this data into their applications.

# Installation
```
npm i maria-hessen
```

# Features
- Handle authentication / Session Management
- Fetch representative teacher plan
- Fetch homework on the "Mein Unterricht" (My Lessons) page"

# Usage

Get your school's name and city from the login page of the Schulportal. Search for your school in the school selector and use the full name displayed in the list. Some schools will have their location inside their name (e.g., `Hochtaunusschule Oberursel`, `city: Oberursel`).

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

# Notice

This library is not officially affiliated with the "Schulportal Hessen" or "Lanis" website. It is a community-driven project.
