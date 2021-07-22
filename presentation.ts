import {Service} from "./service"
import {Collegue} from "./collegue";

const readline = require('readline');

export class Presentation {
    public collegues: Collegue[] = [];
    public collegue: Collegue;

    constructor(
        private service: Service
    ) { }
    demarrer() {
        console.log("1. Lister les collegues\n2. Créer un collègue\n3. Modifier la photo d'un collègue\n99. Sortir")
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('', (answer: string) => {
            switch (answer) {
                case "1":
                    console.log(">> Liste des clients")
                    this.service.list().then(data => {
                        this.collegues = data
                        this.collegues.forEach(c => {
                            console.log(`${c.id} ${c.nom} ${c.prenom}`)
                        })
                        rl.close();
                        this.demarrer();
                    }).catch(err => {
                        console.log(err)
                        rl.close();
                        this.demarrer();
                    })
                    break;
                case "2":
                    const collegue: Collegue = {
                        id: "idRDRDRD",
                        nom: "Jean",
                        prenom: "Mich Mich2",
                        societe: "societe",
                        email: "email@email.com",
                        dateNaissance: "1980-03-13T05:22:33 -01:00",
                        sexe: "homme",
                        adresse: "adresse",
                        password: "password",
                        photo: "photo",
                        departement: "34",
                    };
                    this.service.create(collegue).then(r => r);
                    console.log("Un nouveau collegue creer avec succes")
                    rl.close();
                    this.demarrer()
                    break;
                case "3":
                    this.service.getById("idRDRDRD").then(collegue => console.log(collegue))
                    break;
                case "99":
                    console.log("Au revoir !")
                    rl.close();
                    break;
                default:
                    console.log("Il faut renter un nombre valide ")
                    this.demarrer()
                    break;
            }
        });
    }
}