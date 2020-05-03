

export class PasswordUtilsModel {

    private _salt: string;
    private _hash: string;

    constructor(salt: string, hash: string){
        this._salt = salt;
        this._hash = hash;
    }

    public get salt(): string {
        return this._salt;
    }

    public get hash(): string {
        return this._hash;
    }
}