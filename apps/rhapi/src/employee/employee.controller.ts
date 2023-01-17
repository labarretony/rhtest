import router from "express-promise-router";
import type { Router, Request, Response } from "express";

import { EmployeeService } from "./employee.service";

class EmployeeController {
	#router: Router;

	#employeeService: EmployeeService;

	constructor(employeeService: EmployeeService) {
		this.#router = router();
		this.#employeeService = employeeService;
	}

	routes(): Router {
		this.#router.get("/api/rechercher", async (req: Request, res: Response) => {
			if (req.query.mode === "all") {
				const employees = await this.#employeeService.list();
				return res.json(employees);
			}

			if (req.query.name) {
				const employees = await this.#employeeService.getByName(
					req.query.name as string,
				);
				return res.json(employees);
			}
			res.sendStatus(400);
		});

		this.#router.post("/api/ajouter", async (req: Request, res: Response) => {
			try {
				await this.#employeeService.add(
					req.query.id as string,
					req.query.name as string,
					req.query.lastname as string,
					req.query.salary as string,
					req.query.level as string,
				);

				res.status(201).send("Le salarié a bien été ajouté");
			} catch (error) {
				console.log((error as Error).message);
				return res.status(409).send((error as Error).message);
			}
		});

		this.#router.post("/api/modifier", async (req: Request, res: Response) => {
			try {
				await this.#employeeService.update(
					req.query.id as string,
					req.query.name as string,
					req.query.lastname as string,
					req.query.salary as string,
					req.query.level as string,
				);

				res.status(200).send("Le salarié a bien été modifié");
			} catch (error) {
				console.log((error as Error).message);
				return res.status(409).send((error as Error).message);
			}
		});

		this.#router.delete(
			"/api/supprimer",
			async (req: Request, res: Response) => {
				try {
					await this.#employeeService.delete(req.query.id as string);
					res.status(200).send("Le salarié a bien été supprimé");
				} catch (error) {
					console.log((error as Error).message);
					return res.status(400).send((error as Error).message);
				}
			},
		);

		this.#router.delete(
			"/api/deleteall",
			async (req: Request, res: Response) => {
				await this.#employeeService.deleteAll();
				res.sendStatus(200);
			},
		);
		this.#router.delete(
			"/api/datatest",
			async (req: Request, res: Response) => {
				await this.#employeeService.reset();
			},
		);

		return this.#router;
	}
}

export { EmployeeController };