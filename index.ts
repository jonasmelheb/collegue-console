import { Presentation } from "./presentation";
import {Service} from "./service"
console.log('** Administration Collegues **');

const presentation = new Presentation(new Service());
presentation.demarrer();