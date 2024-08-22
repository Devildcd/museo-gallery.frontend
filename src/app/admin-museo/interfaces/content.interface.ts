
export interface Content {
    id?: number,
    nombre: string,
    info?: string,
    fecha?: Date,
    detalles: string,
    principal: boolean,
    programado: boolean,
    prioridad: boolean,
    tipo: string,
    visitas: number,
    imagenes?: ImagenFile[];
    videos?: VideosEvento[];
}

export interface ImagenFile {
    id?: number,
    content_id: number,
    img: string
}

export interface VideosEvento {
    id?: number,
    content_id: number,
    nombre: string,
    url: string
}