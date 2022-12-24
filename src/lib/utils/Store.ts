import { writable } from "svelte/store"
import type { Grid, Point } from "$lib/utils/Types"

export const grid = writable<Grid>()
export const x2multiplier = writable<Point | undefined>()
export const doubleLetter = writable<Point | undefined>()
export const tripleLetter = writable<Point | undefined>()
