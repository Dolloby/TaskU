const app = require('./app'); // Importa la instancia de Express
const PORT = process.env.PORT || 3015;

// Inicia el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en puerto: ${PORT}`));