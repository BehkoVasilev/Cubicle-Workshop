const express = require('express');
const cookieParser = require('cookie-parser');


const config = require('./config/config');
const initDatabase = require('./config/initDatabase');
const setupViewEngine = require('./config/viewEngine');
// require('./config/viewEngine')(app);
const routes = require('./routes');

const app = express();
setupViewEngine(app);

app.use(express.static("src/public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.use(routes);

initDatabase()
    .then(() => app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}`)))
    .catch((err) => console.error(err.message))

