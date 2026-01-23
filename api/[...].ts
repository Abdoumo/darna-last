import serverless from "serverless-http";
import { createServer } from "../server";

export const config = {
  runtime: "nodejs20.x",
};

export default serverless(createServer());
