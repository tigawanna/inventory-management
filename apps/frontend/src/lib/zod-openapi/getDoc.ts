import "dotenv/config";
import { writeFile } from "node:fs/promises";

async function getOpenAPiDoc() {
    try {
        const apiUrl = process.env?.VITE_API_URL;
        if (!apiUrl) {
            throw new Error("VITE_API_URL is not defined");
        }
        const req = await fetch(apiUrl + "/doc");
        if (!req.ok) {
            throw new Error("Error fetching api doc: " + req.statusText);
        }
        const res = await req.json();
        await writeFile("openapi.json", JSON.stringify(res));
        return res;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Error fetching api doc: " + error.message);
        }
        throw new Error("Error fetching api doc: " + error);
    }
}

getOpenAPiDoc().catch((error) => {
    console.error(
        "=================== something went wrong  =============== ",
        error,
    );
});
