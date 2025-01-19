import { readFile } from "node:fs/promises";

export async function registerRoutesInMainRouter(
    routename: string,
    apiDir: string,
) {
    const mainroutesPath = `${apiDir}/main.route.ts` as const
    const routeImportName = `${routename}Routes`;
    const routeImport =
        `import ${routeImportName} from "./${routename}/${routename}.inxex";`;
    const routeRegister =
        `mainrouter.route("/api/${routename}", ${routeImportName});`;

    const mainroute = await readFile(mainroutesPath, "utf-8");
    const mainrouteArray = mainroute.split("\n");
    const mainRouterStartIndex = mainrouteArray.findIndex((line) =>
        line.includes("const mainrouter = createRouter()")
    );
    mainrouteArray.splice(mainRouterStartIndex - 1, 0, routeImport);
    const routeRegisterendIndex = mainrouteArray.findIndex((line) =>
        line.includes("export default mainrouter")
    );
    mainrouteArray.splice(routeRegisterendIndex, 0, routeRegister);
    
    return {
        tempalte: mainrouteArray.join("\n"),
        pathname: mainroutesPath,
    };
}

