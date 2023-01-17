import express, { Express, Request, Response } from "express";
import cors from "cors";
import { EmployeeModule } from "./employee/employee.module";

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

		new EmployeeModule(this.#app);

		return this.#app;
	}

	run() {
		this.#app.listen(8080, () => {
			console.log("🚀 server started and available on http://localhost:8080");
		});
	}
}

export { Server };
