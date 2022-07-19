import { Preset } from "./types";

export const BASE_FACTOR = 0.25;
export const PIXEL_THICKNESS = 0.0125;

export const gridPresets: Preset[] = [
  {
    name: "6",
    factor: 10 * BASE_FACTOR, // 2.5
    xCount: 4,
    yCount: 2,
    crossScale: 0.03,
    dotScale: 0.004,
  },
  {
    name: "12",
    factor: 5 * BASE_FACTOR, // 1.25
    xCount: 8,
    yCount: 4,
    crossScale: 0.06,
    dotScale: 0.008,
  },
  {
    name: "24",
    factor: 2.5 * BASE_FACTOR, // 0.625
    xCount: 16,
    yCount: 8,
    crossScale: 0.12,
    dotScale: 0.015,
  },
  {
    name: "48",
    factor: 1.25 * BASE_FACTOR, // 0.3125
    xCount: 32,
    yCount: 16,
    crossScale: 0.24,
    dotScale: 0.03,
  },
];
