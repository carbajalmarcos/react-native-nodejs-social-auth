import { Router } from "express";
import "dotenv/config";

export const authRoutes = Router();

const availableFeatures: { "available auth features": string }[] = [];

const features: string = process.env?.ENABLES_AUTH_FEATURES ?? "";

features.split("|").forEach((element) => {
  const route = require(`./${element}`).default;
  authRoutes.use("/", route);
  availableFeatures.push({ "available auth features": element });
});

console.table(availableFeatures);
