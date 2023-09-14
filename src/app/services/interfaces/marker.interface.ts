export type TMarkerDTO = {
    _id: string;
    name: string;
    rate: number;
    lat: number;
    long: number;
}

export type TMarker = TMarkerDTO;

export const markerTransformer = (DTO: TMarkerDTO): TMarker => {
    return {
        _id: DTO._id,
        name: DTO.name,
        rate: DTO.rate,
        lat: DTO.lat,
        long: DTO.long,
    }

}

export type TCreateMarkerBodyDTO = {
    _id?: string;
    name: string;
    rate: number;
    lat: number;
    long: number;
}

export type TCreateMarkerBody= {
    _id?: string;
    name: string;
    rate: number;
    lat: number;
    long: number;
}

export const createMarkerBody = (
    body:TCreateMarkerBody
): TCreateMarkerBodyDTO => {
    return {
        _id: body._id,
        name: body.name,
        rate: body.rate,
        lat: body.lat,
        long: body.long,
    }
}