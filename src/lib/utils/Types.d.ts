export type Path = Point[]
export type Grid = string[][]
export type Dictionary = string[]

export interface Point {
	x: number
	y: number
}

export interface Result {
	word: string
	path: Path
}

export interface RatedResult extends Result {
	score: number
}
