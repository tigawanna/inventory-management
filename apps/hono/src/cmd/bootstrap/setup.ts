import { readFile } from "node:fs/promises";

export async function registerRoutesInMainRouter(
  basepath: string,
  routename: string,
) {
  const filename = "main.route.ts";
  const mainroutesPath = `${basepath}/${filename}` as const;
  const routeImportName = `${routename}Routes`;
  const routeImport
        = `import ${routeImportName} from "./${routename}/${routename}.index";`;
  const routeRegister
        = `mainrouter.route("/api/${routename}", ${routeImportName});`;

  const mainroute = await readFile(mainroutesPath, "utf-8");
  const mainrouteArray = mainroute.split("\n");
  const importExists = mainrouteArray.some(line =>
    line.includes(routeImport),
  );
  if (!importExists) {
    const mainRouterStartIndex = mainrouteArray.findIndex(line =>
      line.includes("const mainrouter = createRouter()"),
    );
    mainrouteArray.splice(mainRouterStartIndex - 1, 0, routeImport);
  }
  const routeRegisterExists = mainrouteArray.some(line =>
    line.includes(routeRegister),
  );
  if (!routeRegisterExists) {
    const routeRegisterendIndex = mainrouteArray.findIndex(line =>
      line.includes("export default mainrouter"),
    );
    mainrouteArray.splice(routeRegisterendIndex - 1, 0, routeRegister);
  }
  // await writeFile(mainroutesPath, mainrouteArray.join("\n"));
  return {
    template: mainrouteArray.join("\n"),
    filename,
  };
}
