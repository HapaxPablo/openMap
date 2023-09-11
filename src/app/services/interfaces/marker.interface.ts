export type TMarkerDTO = {
    name: string;
    rate: number;
    lat: number;
    long: number;
}

export type TMarker = TMarkerDTO;

export const markerTransformer = (DTO: TMarkerDTO): TMarker => {
    return {
        name: DTO.name,
        rate: DTO.rate,
        lat: DTO.lat,
        long: DTO.long,
    }

}

export type TCreateMarkerBodyDTO = {
    name: string;
    rate: number;
    lat: number;
    long: number;
}

export type TCreateMarkerBody= {
    name: string;
    rate: number;
    lat: number;
    long: number;
}

export const createMarkerBody = (
    body:TCreateMarkerBody
): TCreateMarkerBodyDTO => {
    return {
        name: body.name,
        rate: body.rate,
        lat: body.lat,
        long: body.long,
    }
}