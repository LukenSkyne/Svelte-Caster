import { writable } from "svelte/store"
import type { Grid, Path, Point } from "$lib/utils/Types"

export const grid = writable<Grid | undefined>()
export const x2multiplier = writable<Point | undefined>()
export const doubleLetter = writable<Point | undefined>()
export const tripleLetter = writable<Point | undefined>()
export const selectedPath = writable<Path | undefined>()
