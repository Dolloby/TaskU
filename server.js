const app = require('./app'); // Importa la instancia de Express
const PORT = process.env.PORT || 3010;

// Inicia el servidor
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));