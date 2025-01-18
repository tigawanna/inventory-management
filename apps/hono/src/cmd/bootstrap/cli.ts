/* eslint-disable no-console */

import { ANSIColors } from "@/shared/utils/text";

import { apiServiceTemplate } from "./templates/api-service-template";

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
  console.log(
    apiServiceTemplate({routename}),
  );
}
generateAPIboilerpalte()
  .catch((e) => {
    console.error("something went wrong ", ANSIColors.FgRed, e.message);
  });
