import {
  TCreateMarkerBody,
  TCreateMarkerBodyDTO,
  TMarker,
  TMarkerDTO,
  TMarkerForm,
  TPatchMarkerBody,
  TPatchMarkerBodyDTO,
} from './marker.interface';

export const markerTransformer = (DTO: TMarkerDTO): TMarker => {
  return {
    _id: DTO._id,
    name: DTO.name,
    rate: DTO.rate,
    location: DTO.location,
    barrier_free_elements: DTO.barrier_free_elements,
  };
};

export const createMarkerBodyDTO = (
  body: TCreateMarkerBody,
): TCreateMarkerBodyDTO => {
  const {location} = body;
  return {
    name: body.name,
    rate: body.rate,
    location: {
      lat: location.lat,
      long: location.long,
      name_address: location.nameAddress,
    },
    barrier_free_elements: body.barrierFreeElements,
  };
};

export const createMarkerBody = (body: TMarkerForm): TCreateMarkerBody => {
  const selectedBarriers = body.barrierFree
    .filter((item) => item.checked)
    .map((item) => item.label);

  return {
    name: body.markerName,
    rate: body.rating,
    barrierFreeElements: selectedBarriers,
    location: {
      lat: body.lat,
      long: body.long,
      nameAddress: body.nameAddress,
    },
  };
};

export const patchMarkerBody = (
  body: TPatchMarkerBody,
): TPatchMarkerBodyDTO => {
  return {
    _id: body._id,
    name: body.name,
    rate: body.rate,
    barrier_free_elements: body.barrierFreeElements,
  };
};

export const patchMarkerDTO = (body: TPatchMarkerBodyDTO): TPatchMarkerBody => {
  return {
    _id: body._id,
    name: body.name,
    rate: body.rate,
    barrierFreeElements: body.barrier_free_elements,
  };
};
