const jwt = require("jsonwebtoken");

const header =  {
    "alg": "HS256",
    "typ": "JWT"
  };

const payload = {
    id: "60620c38dafd60282cb6a78c"
};

const SECRET_KEY = "fga43q";

const token = jwt.sign(payload, SECRET_KEY, header);

// console.log(token)

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjIwYzM4ZGFmZDYwMjgyY2I2YTc4YyIsImlhdCI6MTYxNzA0MDk1OH0.JtDQpO7AHPUgCDcnjnKvq1ep2CK9OoHDTuf4XUjx2rQ

const decodeToken = jwt.decode(token);
// console.log(decodeToken)
try {
  const verifyToken = jwt.verify(`${token}g`, SECRET_KEY);
  console.log("Добро пожаловать")
}
catch (error){
  console.log(error.message)
}

