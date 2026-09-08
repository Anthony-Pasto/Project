const express = require('express');
const app = express();

const PORT = 3000;


// Page d'accueil
app.get('/', (req, res) => {
    res.send(`
        <h1>Bienvenue sur mon site</h1>

        <p><a href="/contact">Contact</a></p>
        <p><a href="/module/1">Module 1</a></p>
        <p><a href="/module/2">Module 2</a></p>
        <p><a href="/module/3">Module 3</a></p>
        <p><a href="/module/4">Module 4</a></p>
        <p><a href="/module/5">Module 5</a></p>
        <p><a href="/module/6">Module 6</a></p>
    `);
});


// Page contact
app.get('/contact', (req, res) => {
    res.send(`
        <h1>Contact</h1>

        <table border="1">
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Adresse</th>
                <th>Courriel</th>
                <th>Téléphone</th>
            </tr>

            <tr>
                <td>Pasto</td>
                <td>Anthony</td>
                <td>123 Rue de l'École</td>
                <td>anthopasto2006@email.com</td>
                <td>5143462569</td>
            </tr>
        </table>

        <br>
        <a href="/">Retour à l'accueil</a>
    `);
});


// Route module
app.get('/module/:numero', (req, res) => {

    const numero = parseInt(req.params.numero);

    if (numero >= 1 && numero <= 6) {
        res.send(`
            <h1>Module ${numero}</h1>
            <p>Vous êtes dans le module ${numero}.</p>

            <a href="/">Retour à l'accueil</a>
        `);
    } else {
        res.send(`
            <h1>MODULE INCONNU</h1>

            <a href="/">Retour à l'accueil</a>
        `);
    }
});


// Page 404
app.use((req, res) => {
    res.status(404).send(`
        <h1>Erreur 404</h1>
        <p>Page inexistante</p>

        <a href="/">Retour à l'accueil</a>
    `);
});


// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});