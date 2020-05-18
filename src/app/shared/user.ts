
export class User {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public address: string,
        public zip: string,
        public city: string,
        public country: string,
        public volunteer?: boolean
    ){}
}

