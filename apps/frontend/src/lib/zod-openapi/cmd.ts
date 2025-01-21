import "dotenv/config";
import { exec } from "node:child_process";
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
async function generateZodOpenAPIClient() {
    await getOpenAPiDoc();
    const commands = [
        "openapi-zod-client",
        "openapi.json",
        "--output",
        "src/lib/zod-openapi/generated",
        "--group-strategy",
        "tag-file",
        "--export-schemas",
        "--export-schemas",
        "--export-types",
        "--strict-objects",
    ];
    console.log("running command: " + commands.join(" "));
    exec("pnpm " + commands.join(" "), (error, stdout, stderr) => {
        if (error) {
            console.error(`error running command: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

generateZodOpenAPIClient().catch((error) => {
    console.error(
        "=================== something went wrong  =============== ",
        error,
    );
});
