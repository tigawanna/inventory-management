export class MyAuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MyAuthError";
    }
}
