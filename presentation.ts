import {Service} from "./service"
import {Collegue} from "./collegue";

const readline = require('readline');

export class Presentation {
    public collegues: Collegue[] = [];

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
                    rl.question('Enter votre nom : ', (nom: string) => {
                        rl.question('Enter votre prénom : ', (prenom: string) => {
                            const collegue: Collegue = {
                                id: "id" + nom + prenom,
                                nom: nom,
                                prenom: prenom,
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
                            rl.close();
                        });
                    });

                    break;
                case "3":
                    rl.question("Enter l'id de votre collegue  : ", (idTer: string) => {
                        rl.question('Enter la nouvelle image : ', async (image: string) => {
                            const collegue = await this.service.getById(idTer)
                            const collegueUpdated: Collegue = {
                                id: collegue.id,
                                nom: collegue.nom,
                                prenom: collegue.prenom,
                                societe: collegue.societe,
                                email: collegue.email,
                                dateNaissance: collegue.dateNaissance,
                                sexe: collegue.sexe,
                                adresse: collegue.adresse,
                                password: collegue.password,
                                photo: image,
                                departement: collegue.departement,
                            };
                            await this.service.update(collegueUpdated, idTer);
                            console.log("La nouvelle image est update")
                            rl.close();
                            this.demarrer()
                        });
                    });
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