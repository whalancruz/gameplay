import { IMembers } from "./members.interfaces";

export interface IGuild {
    id: string;
    name: string;
    icon: string | null;
    iconUrl: string;
    owner: boolean;
}

export interface IGuildWidget {
    id: string;
    name: string;
    instant_invite: string;
    presence_count: number;
    members: IMembers[];  
}