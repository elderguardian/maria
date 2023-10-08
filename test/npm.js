const {Maria} = require('maria-hessen')

const maria = new Maria({
  auth: {
    username: "my-user",
    password: "my-password",
    school: {
      name: "TestSchool",
      city: "Frankfurt",
    },
  },
});
