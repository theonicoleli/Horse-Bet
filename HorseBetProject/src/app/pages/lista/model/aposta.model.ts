import { Cavalo } from "../../model/cavalo.model";

export interface Aposta {
    nome: string;
    numeroCavalos: number;
    estadoCorrida: string;
    cidadeCorrida: string;
    localCorrida: string;
    participante: any;
    cavalos: Cavalo[];
}
  