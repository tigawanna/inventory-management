export class CookieManager {
    static get(name: string): string | null {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === name) {
                return value?value:null
            }
        }
        return null;
    }

    static set(name: string, value: string, days: number): void {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/;`;
    }

    static remove(name: string): void {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    static clearAccessAndRefreshTokens(): void {
        this.remove("accessToken");
        this.remove("refreshToken");
    }
}
