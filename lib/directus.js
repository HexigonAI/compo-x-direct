import getConfig from "next/config";
import { Directus } from "@directus/sdk";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
const { url } = publicRuntimeConfig;
const { email, password, token } = serverRuntimeConfig;

const directus = new Directus(url);

export async function getDirectusClient() {
  if (email && password) {
    await directus.auth.login({ email, password });
  } else if (token) {
    await directus.auth.static(token);
  }

  return directus;
}



export async function publicData() {
	// GET DATA

	// We don't need to authenticate if the public role has access to some_public_collection.
	const publicData = await directus.items('some_public_collection').readByQuery({ sort: ['id'] });
    console.log("publicData.data");

	return console.log(publicData.data);
}

export function test() {
	// GET DATA

	
    console.log("publicData.data");
}