# Maria

Maria is a TypeScript library designed to simplify the process of fetching from the "Schulportal Hessen" or "Lanis" website. This library provides a convenient interface for programmatically retrieving teacher plans, making it easier for developers to integrate this data into their applications.

# Features

- Fetch teacher plans for specific schools from the "Schulportal Hessen" or "Lanis" website.
    - Retrieve detailed information about teacher schedules, including classes and subjects.
    - Handle authentication and session management for accessing the Lanis system.

# Usage

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
