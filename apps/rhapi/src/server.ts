import express, { Express, Request, Response } from "express";
import cors from "cors";
import fs from "node:fs";
import salaries from "./resources/salarie.json";

interface Salarie {
	id: string;
	name: string;
	lastname: string;
	salary: string;
	level: string;
	time: number;
}

class Server {
	#app: Express;

	constructor() {
		this.#app = express();
	}

	bootstrap() {
		this.#app.use(cors());
		this.#app.use(express.json());
		this.#app.use(
			express.urlencoded({
				extended: false,
			}),
		);

		this.#app.get("/hello", (req: Request, res: Response) => {
			res.json({ message: "Hello world!" });
		});

		this.#app.get("/api/rechercher", function (req: Request, res: Response) {
			const listesalarie: Salarie[] = salaries.data;

			if (req.query.mode === "all") {
				return res.json(
					listesalarie.sort(function (b, a) {
						return a.time - b.time;
					}),
				);
			}

			if (req.query.name) {
				const filtrelistesalarie = listesalarie.filter(
					(salarie) => salarie.name === req.query.name,
				);

				return res.json(
					filtrelistesalarie.sort(function (b, a) {
						return a.time - b.time;
					}),
				);
			}

			res.sendStatus(400);
		});

		this.#app.post("/api/ajouter", function (req: Request, res: Response) {
			const listesalarie: Salarie[] = salaries.data;
			let nberr = 0;
			let message = "";

			const salary = parseFloat(req.query.salary as string);
			if (req.query.salary && (salary < 0 || isNaN(salary))) {
				nberr++;
				message = "Le salaire doit être un nombre positif";
			}

			const level = Math.abs(parseInt(req.query.level as string));
			if (req.query.level && (level > 10 || isNaN(level))) {
				nberr++;
				message = "Le niveau doit être > -10 et < 10";
			}

			if (req.query.id === "") {
				nberr++;
				message = "Le matricule est obligatoire";
			} else {
				const found = listesalarie.findIndex(
					(salarie) => salarie.id === req.query.id,
				);

				if (found !== -1) {
					nberr++;
					message = "Le matricule existe déjà";
				}
			}

			if (nberr > 0) {
				console.log(message);
				return res.status(409).send(message);
			}

			var horodate = new Date().getTime();
			listesalarie.push({
				id: req.query.id as string,
				name: req.query.name as string,
				lastname: req.query.lastname as string,
				salary: req.query.salary as string,
				level: req.query.level as string,
				time: horodate,
			});

			message = "Le salarié a bien été ajouté";
			res.status(201).send(message);
		});

		this.#app.post("/api/modifier", function (req: Request, res: Response) {
			const listesalarie: Salarie[] = salaries.data;
			let nberr = 0;
			let message = "";

			const salary = parseFloat(req.query.salary as string);
			if (req.query.salary && (salary < 0 || isNaN(salary))) {
				nberr++;
				message = "Le salaire doit être un nombre positif";
			}

			const level = Math.abs(parseInt(req.query.level as string));
			if (req.query.level && (level > 10 || isNaN(level))) {
				nberr++;
				message = "Le niveau doit être > -10 et < 10";
			}

			if (req.query.id === "") {
				nberr++;
				message = "Le matricule est obligatoire";
			} else {
				const found = listesalarie.findIndex(
					(salarie) => salarie.id === req.query.id,
				);

				if (found === -1) {
					nberr++;
					message = "Le matricule n' a pas été trouvé";
				}
			}

			if (nberr > 0) {
				console.log(message);
				return res.status(409).send(message);
			}

			const salarie = listesalarie.find(
				(salarie) => salarie.id === req.query.id,
			)!;
			salarie.id = req.query.id as string;
			salarie.name = req.query.name as string;
			salarie.lastname = req.query.lastname as string;
			salarie.salary = req.query.salary as string;
			salarie.level = req.query.level as string;
			salarie.time = new Date().getTime();

			message = "Le salarié a bien été modifié";
			res.status(200).send(message);
		});

		this.#app.delete("/api/supprimer", function (req: Request, res: Response) {
			let message = "";
			if (req.query.id === "") {
				message = "le salarié n'a pas été trouvé";
				console.log("pas de matricule trouvé");
				return res.status(400).send(message);
			}

			console.log(`Suppression du matricule ${req.query.id} en cours`);
			const listesalarie: Salarie[] = salaries.data;
			const found = listesalarie.findIndex(
				(salarie) => salarie.id === req.query.id,
			);
			if (found === -1) {
				message = "le salarié n'a pas été trouvé";
				console.log("pas de matricule trouvé");
				return res.status(400).send(message);
			}

			listesalarie.splice(found, 1);
			message = "Le salarié a bien été supprimé";
			res.status(200).send(message);
		});

		this.#app.delete("/api/deleteall", function (req: Request, res: Response) {
			salaries.data = [];
			res.sendStatus(200);
		});

		this.#app.delete("/api/datatest", function (req: Request, res: Response) {
			const fileData = JSON.parse(
				fs.readFileSync(`${__dirname}/resources/salarie.json`, "utf-8"),
			);
			salaries.data = fileData.data;
			res.status(200).send("Le fichier de salarié a été reinitialisé");
		});

		return this.#app;
	}

	run() {
		this.#app.listen(8080, () => {
			console.log("🚀 server started and available on http://localhost:8080");
		});
	}
}

export { Server };
