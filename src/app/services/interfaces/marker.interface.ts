export type TMarkerDTO = {
    _id: string;
    name: string;
    rate: number;
    location: {
        lat: number;
        long: number;
        name_address: string;
    },
    barrier_free_elements: string[]
}
export type TMarker = TMarkerDTO;

export const markerTransformer = (DTO: TMarkerDTO): TMarker => {
    return {
        _id: DTO._id,
        name: DTO.name,
        rate: DTO.rate,
        location: DTO.location,
        barrier_free_elements: DTO.barrier_free_elements
    }

}

export type TCreateMarkerBodyDTO = {
    _id?: string;
    name: string | null;
    rate: number | null;
    location: {
        lat: number;
        long: number;
        name_address: string;
    };
    barrier_free_elements: string[] | null
}

export type TCreateMarkerBody = {
    _id?: string;
    name: string | null;
    rate: number | null;
    location: {
        lat: number;
        long: number;
        name_address: string;
    };
    barrier_free_elements: string[] | null
}

export const createMarkerBody = (
    body: TCreateMarkerBody
): TCreateMarkerBodyDTO => {
    return {
        _id: body._id,
        name: body.name,
        rate: body.rate,
        location: body.location,
        barrier_free_elements: body.barrier_free_elements
    }
}

export type TPatchMarkerDTO = {
    _id: string;
    name: string;
    rate: number;
    barrier_free_elements: string[]
}
export type TPatchMarker = TPatchMarkerDTO;

export type TPatchMarkerBodyDTO = {
    _id: string;
    name: string;
    rate: number;
    barrier_free_elements: string[]
}

export type TPatchMarkerBody = {
    _id: string;
    name: string;
    rate: number;
    barrier_free_elements: string[]
}

export const patchMarkerBody = (
    body: TPatchMarkerBody
): TPatchMarkerBodyDTO => {
    return {
        _id: body._id,
        name: body.name,
        rate: body.rate,
        barrier_free_elements: body.barrier_free_elements
    }
}

export type TMarkerForm = {
    markerName: string;
    rating: number | null;
    barrierFree: { label: string; value: string; checked: boolean }[];
    
  };