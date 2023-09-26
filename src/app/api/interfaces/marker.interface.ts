export type TMarkerDTO = {
  _id: string;
  name: string;
  rate: number;
  location: {
    lat: number;
    long: number;
    name_address: string;
  };
  barrier_free_elements: string[];
};
export type TMarker = TMarkerDTO;

export type TCreateMarkerBodyDTO = {
  name: string;
  rate: number;
  location: {
    lat: number;
    long: number;
    name_address: string;
  };
  barrier_free_elements: string[];
};

export type TCreateMarkerBody = {
  name: string;
  rate: number;
  location: {
    lat: number;
    long: number;
    nameAddress: string;
  };
  barrierFreeElements: string[];
};

export type TPatchMarkerDTO = {
  _id: string;
  name: string;
  rate: number;
  barrier_free_elements: string[];
};
export type TPatchMarker = TPatchMarkerDTO;

export type TPatchMarkerBodyDTO = {
  _id: string;
  name: string;
  rate: number;
  barrier_free_elements: string[];
};

export type TPatchMarkerBody = {
  _id: string;
  name: string;
  rate: number;
  barrierFreeElements: string[];
};

export type TMarkerForm = {
  markerName: string;
  rating: number;
  barrierFree: { label: string; value: string; checked: boolean }[];
  lat: number;
  long: number;
  nameAddress: string;
};

export type TAuth = {
  userName: string;
  password: string;
};
