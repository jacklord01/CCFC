import { createClient } from "contentful";

const space = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN!;

export const client = createClient({
  space,
  accessToken,
});

export const previewClient = createClient({
  space,
  accessToken: previewToken,
  host: "preview.contentful.com",
});
