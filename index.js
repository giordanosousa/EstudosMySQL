require('dotenv').config();
const http = require('http');
const express = require('express');
const status = require('http-status');
const sequelize = require('./src/database/database');
const app = express();
const routes = require('./src/routes/routes');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/sistema', routes);

// Middleware para tratar 404
app.use((req, res, next) => {
    res.status(status.NOT_FOUND).send("Page not found");
});

// Middleware para tratar erros internos do servidor
app.use((err, req, res, next) => {
    console.error(err); // Exibir o erro no console para depuração
    res.status(status.INTERNAL_SERVER_ERROR).json({ error: err.message });
});

sequelize.sync({ force: false }).then(() => {
    const port = process.env.PORT || 3003;
    app.set("port", port);
    const server = http.createServer(app);
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
