
export interface User {
    name: string;
    address: string;
    userReference: number;
    transportvehicle: string;
    deliveries: number;
}

export interface Assignment {
    date: Date;
    parcelCount: number;
}