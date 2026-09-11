const express = require('express');
const app = express();
const PORT = 3000;
const { exec } = require('child_process');
var status = [false, false, false, false, false, false];
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// Page d'accueil
app.get('/', (req, res) => {
maFonction();
   res.render('index' )
});
function maFonction() {
if(status[5]==true)
        exec('pinctrl set 4 op dh');
    else 
        exec('pinctrl set 4 op dl');
    if(status[4]==true)
        exec('pinctrl set 22 op dh');
    else 
        exec('pinctrl set 22 op dl');
    if(status[3]==true)
        exec('pinctrl set 27 op dh');
    else 
        exec('pinctrl set 27 op dl');
    if(status[2]==true)
        exec('pinctrl set 10 op dh');
    else 
        exec('pinctrl set 10 op dl');
    if(status[1]==true)
        exec('pinctrl set 9 op dh');
    else 
        exec('pinctrl set 9 op dl');
    if(status[0]==true)
        exec('pinctrl set 11 op dh');
    else 
        exec('pinctrl set 11 op dl');
}
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
maFonction();
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
maFonction();
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
