import dotenv from "dotenv";
dotenv.config();
const { ANIMALS_NODE_PORT: port } = process.env;

export default port;
