import { isLocalhost } from "utils/isLocalhost";

export const apiVersion = 'v1'
export const basePath = isLocalhost ?
    `${window.location.protocol}//${window.location.hostname}:4003/api` :
    `${window.location.origin}/api`;