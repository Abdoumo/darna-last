import serverless from "serverless-http";
import { createServer } from "../server";

export const config = {
  runtime: "nodejs",
};

export default serverless(createServer());
