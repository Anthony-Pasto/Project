/*
    Auteur: Anthony Pasto
    Date: 2026/09/11
    Titre: Serveur de contrôle des modules
    Description: Ce fichier configure un serveur Express qui affiche la page
    d'accueil, la page de contact et l'état de six modules. Il permet aussi
    d'activer, de désactiver, de contrôler et de réinitialiser les modules.
*/
const express = require('express');
const app = express();

const PORT = 3000;
var status = [false, false, false, false, false, false];
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// Page d'accueil
app.get('/', (req, res) => {
   res.render('index' )
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
app.post('/module/:numero', (req, res) => {

    const numero = parseInt(req.params.numero);

    if (numero >= 1 && numero <= 6) {

        status[numero - 1] = req.body.etat === "on";


    }

    res.redirect('/module/' + numero);
});

app.get('/module/:numero', (req, res) => {

    const numero = parseInt(req.params.numero);

    if (numero >= 1 && numero <= 6) {

        res.render('module', {
            nombre: numero,
            donner: status[numero - 1]
        });

    } else {

        res.render('module', {
            nombre: numero,
            donner: false
        });
    }
});
app.get('/reset', (req, res) => {
    for (let i = 0; i < status.length; i++) {
        status[i] = false;
    }
    res.send(`
        Statut réinitialisé.
        <a href="/">Retour à l'accueil</a>
        `);
});
app.get('/controle', (req, res) => {
    
    res.send(`
       statut actuel : ${status}
        

        <a href="/">Retour à l'accueil</a>
        `);
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