export type User = {
    id: number;
    email: string;
    first_name: string | null ;
    status: string;
    last_name: string ;
    initials: string | null;
    created_at: Date;
    updated_at: Date;
    users_addresses: Address[];
};


export type Address = {
    street: string;
    building_number: string;
    address_type: string;
    city: string;
    country_code: string;
    post_code: string;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    valid_from: Date;
};

export type GetUserAddressesResponse =  | { addresses: Address[]; quantityAddress: number; error?: undefined }
    | { error: string; users?: undefined; quantityUsers?: undefined };

export type GetUsersResponse =
    | { users: User[]; quantityUsers: number; error?: undefined }
    | { error: string; users?: undefined; quantityUsers?: undefined };