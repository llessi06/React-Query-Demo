interface Person {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: Address;
}

interface Address {
    id: string;
    street: string;
    city: string;
    zip: string;
    state: string;
}

export type {Person, Address};