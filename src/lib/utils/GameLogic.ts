import type { Point } from "$lib/utils/Types"
import { grid, doubleLetter, tripleLetter } from "$lib/utils/Store"
import { get } from "svelte/store"

export function getWeight(char: string): number {
	if (char === "") {
		return 0
	}

	const weightMap: { [key: string]: number } = {
		"aeio": 1,
		"rstn": 2,
		"dgl": 3,
		"bhupmy": 4,
		"cfwv": 5,
		"k": 6,
		"xj": 7,
		"qz": 8,
	}

	for (const key in weightMap) {
		if (key in weightMap && key.includes(char)) {
			return weightMap[key]
		}
	}

	return -1
}

export function getWeightEx(p: Point): number {
	const char = get(grid)[p.y][p.x]
	const multiplier = pointEquals(p, get(tripleLetter)) ? 3 : pointEquals(p, get(doubleLetter)) ? 2 : 1

	return getWeight(char) * multiplier
}

export function pointEquals(a?: Point, b?: Point): boolean {
	return a?.x === b?.x && a?.y === b?.y
}
