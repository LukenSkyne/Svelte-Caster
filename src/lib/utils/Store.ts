import { writable } from "svelte/store"
import { Empty } from "$lib/utils/ExampleData"
import type { Grid, Path, Point } from "$lib/utils/Types"

export const grid = writable<Grid>(Empty)
export const x2multiplier = writable<Point | undefined>()
export const doubleLetter = writable<Point | undefined>()
export const tripleLetter = writable<Point | undefined>()
export const selectedPath = writable<Path | undefined>()
