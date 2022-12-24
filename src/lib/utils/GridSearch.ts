import type { Grid, Dictionary, Result, Path } from "$lib/utils/Types"

export function findWordsDFS(grid: Grid, dictionary: Dictionary): Result[] {
	const results: Result[] = []
	const width = grid[0].length - 1
	const height = grid.length - 1

	function visitCell(x: number, y: number, path: Path, dict: Dictionary) {
		if (x < 0 || x > width || y < 0 || y > height || grid[y][x] === "") {
			return
		}

		path.push({ x, y })

		const word = path.map((p) => grid[p.y][p.x]).join("")
		dict = dict.filter((w) => w.startsWith(word))

		if (dict.length === 0) {
			return
		}

		if (dict.includes(word)) {
			results.push({ word, path })
		}

		for (let i = -2; ++i < 2;) {
			for (let j = -2; ++j < 2;) {
				if (i === 0 && j === 0) {
					continue
				}

				const next = { x: x + j, y: y + i }

				if (path.findIndex((p) => p.x === next.x && p.y === next.y) === -1) {
					visitCell(next.x, next.y, [ ...path ], dict)
				}
			}
		}
	}

	for (let y = 0; y < grid.length; ++y) {
		for (let x = 0; x < grid[y].length; ++x) {
			visitCell(x, y, [], dictionary)
		}
	}

	return results
}
