const express = require('express');
const config = require('./config/config');
const setupViewEngine = require('./config/viewEngine');
// require('./config/viewEngine')(app);
const router = require('./routes');

const app = express();
setupViewEngine(app);

app.use(express.static("src/public"));
app.use(router)
app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}`));