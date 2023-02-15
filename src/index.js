const express = require('express');
const cookieParser = require('cookie-parser');


const config = require('./config/config');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const initDatabase = require('./config/initDatabase');
const setupViewEngine = require('./config/viewEngine');
// require('./config/viewEngine')(app);
const routes = require('./routes');
const authMiddleware = require('./middlewares/authMiddleware');


const app = express();
setupViewEngine(app);

app.use(express.static("src/public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(authMiddleware.authentication);
app.use(routes);
app.use(errorHandler);

initDatabase()
    .then(() => app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}`)))
    .catch((err) => console.error(err.message))

