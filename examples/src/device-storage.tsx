import { TAuthResponse } from "franken-srp";
import { LoginProps } from "franken-srp-react";

const STORAGE_KEY = "fraken-srp-example";
const storageKey = (username: string) => [STORAGE_KEY, username].join(".");

type TDevice = Required<Required<TAuthResponse>["newDevice"]>;
const isDevice = (d: any): d is TDevice =>
  typeof d === "object" &&
  typeof d.key === "string" &&
  typeof d.groupKey === "string" &&
  typeof d.password === "string";

export const getDevice: LoginProps["deviceForUsername"] = (username) => {
  const item = localStorage.getItem(storageKey(username));
  if (item) {
    try {
      const parsed = JSON.parse(item);
      if (isDevice(parsed)) {
        console.log("FOUND DEVICE", username, parsed);
        return parsed;
      }
    } catch {}
  }
  return undefined;
};

export const setDevice = (username: string, device: TDevice) => {
  localStorage.setItem(storageKey(username), JSON.stringify(device));
};
