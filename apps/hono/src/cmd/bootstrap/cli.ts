import { ANSIColors } from "@/shared/utils/text";

import { ensurePathExistsOrCreate } from "../utils/fs";
import { registerRoutesInMainRouter } from "./setup";
import { apiCreateTemplate } from "./templates/api-create-template";
import { apiDeleteTemplate } from "./templates/api-delete-template";
import { apiGetOneTemplate } from "./templates/api-get-one-template";
import { apiIndexTemplate } from "./templates/api-index-template";
import { apiListTemplate } from "./templates/api-list-template";
import { apiServiceTemplate } from "./templates/api-service-template";
import { apiUpdateTemplate } from "./templates/api-update-template";
import { apiSchemaTemplate } from "./templates/api.schema.tempalte";

// const API_DIRECTORY = "./src/api";
// const DB = "./src/db";
async function generateAPIboilerpalte() {
  const routename = process.argv[2];
  if (!routename) {
    throw new Error("endpoint name requiered");
  }
  if (routename && routename.length < 3) {
    throw new Error("endpoint name too short");
  }
  const tasks = [
    apiServiceTemplate({ routename }),
    apiSchemaTemplate({ routename }),
    apiListTemplate({ routename }),
    apiGetOneTemplate({ routename }),
    apiCreateTemplate({ routename }),
    apiUpdateTemplate({ routename }),
    apiDeleteTemplate({ routename }),
    apiIndexTemplate({ routename }),
  ];
  // registerRoutesInMainRouter(routename, "./src/api")
  tasks.map(async (task) => {
    const { template, filename } = task;
    const filepath = `${routename}/${filename}`;
    await ensurePathExistsOrCreate("./src/api", filepath, template);
  });
}
generateAPIboilerpalte()
  .catch((e) => {
    console.error("something went wrong ", ANSIColors.FgRed, e.message);
  });
