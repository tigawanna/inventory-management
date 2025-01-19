import { access, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";


export async function ensurePathExistsOrCreate(basepath: string,path: string, component: string) {
  const component_path = resolve(basepath, path);
  try {
    await access(component_path);
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message.includes("no such file or directory")) {
        await writeFile(component_path, component).catch(async (err) => {
          if (err.code === "ENOENT") {
            const directryPath = component_path
              .split("/")
              .slice(0, -1)
              .join("/");
            await mkdir(directryPath, { recursive: true });
            await writeFile(component_path, component);
          }
        });
      }
    }
  }
}
