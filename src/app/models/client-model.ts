import { RegionModel } from './region.model';

export class ClientModel {
    id: number;
    name: string;
    email: string;
    lastName: string;
    createdAt: Date;
    photo: string;
    region: RegionModel;
}
