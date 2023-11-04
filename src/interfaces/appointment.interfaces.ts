import { ICategoriesProps } from "../utils/categories";
import { IGuild } from "./guilds.interfaces";

export interface IAppointment {
    id: string;
    category: ICategoriesProps;
    guild: IGuild;
    date: Date;
    description: string;
    membersOnly?: string;
}