import fetch from 'node-fetch';
import {Collegue} from "./collegue";

export class Service {
    constructor() {
    }

    async list() {
        const response = await fetch('https://c1.cleverapps.io/collegues');
        return response.json();
    }

    async create(collegue: Collegue) {
        const response = await fetch('https://c1.cleverapps.io/collegues/', {
            method: 'post',
            body: JSON.stringify(collegue),
            headers: {'Content-Type': 'application/json'}
        });
        return response.json();
    }

    async getById(id: string) {
        const response = await fetch('https://c1.cleverapps.io/collegues/' + id);
        return response.json();
    }

    async update(collegue: Collegue, id: string) {
        const response = await fetch('https://c1.cleverapps.io/collegues/' + id, {
            method: 'patch',
            body: JSON.stringify(collegue),
            headers: {'Content-Type': 'application/json'}
        });
        return await response.json();
    }
}