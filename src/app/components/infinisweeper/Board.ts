type Address = `${number},${number}`;

export class Board {
    private tiles: Record<Address, Tile> = {};
    private readonly fontColors = ["#1977D3", "#3B8E3F", "#D53734", "#7A1EA2", "#FF8F00", "#159AA4", "#434343", "#A99D93"];
    private startingTile: Vector2 | null = null;

    private static getAddress(x: number, y: number): Address {
        return `${x},${y}` as Address;
    }

    public get(x: number, y: number): Tile {
        const address = Board.getAddress(x, y);
        if (!this.tiles[address]) return this.generate(x, y);
        return this.tiles[Board.getAddress(x, y)];
    }

    private generate(x: number, y: number): Tile {
        const address = Board.getAddress(x, y);
        if (this.tiles[address]) return this.tiles[address];

        this.tiles[address] = {
            covered: true,
            flagged: false,
            value: this.random(x, y) < 0.21 ? -1 : 0,
            position: { x, y, },
        };

        if (this.tiles[address].value === -1) {
            for(let xx = x - 1; xx <= x + 1; xx++) {
                for(let yy = y - 1; yy <= y + 1; yy++) {
                    const tile = this.get(xx, yy);
                    if ((xx === x && yy === y) || tile.value === -1) continue;
                    this.get(xx, yy).value++;
                }
            }
        }

        return this.tiles[address];
    }

    public draw(g: CanvasRenderingContext2D, start: Vector2, end: Vector2) {
        g.textAlign = "center";
        
        for(let x = start.x; x < end.x; x++) {
            for(let y = start.y; y < end.y; y++) {
                const tile = this.get(x, y);

                g.fillStyle = this.getTileColor(x, y);
                g.fillRect(x, y, 1, 1);

                if (!tile.covered) {
                    if (tile.value === -1) {
                        g.fillStyle = "black";
                        g.fillRect(x, y, 1, 1);
                    } else if (tile.value > 0) {
                        const fontSize = 0.5;
                        const text = tile.value.toString();
                        g.font = `${fontSize}px Arial`;
                        g.fillStyle = this.fontColors[tile.value - 1];
                        g.fillText(text, x + 0.5, y + fontSize / 2 + 0.5);
                    }
                } else if (this.startingTile?.x === x && this.startingTile?.y === y) {
                    g.globalAlpha = Math.sin(performance.now() / 150) / 2 + 0.5;
                    g.fillStyle = "#fff";
                    g.fillRect(x, y, 1, 1);
                    g.globalAlpha = 1;
                }
            }
        }

        if (this.startingTile === null) this.findStartingTile({
            x: (end.x + start.x) / 2,
            y: (end.y + start.y) / 2,
        });
    }

    private findStartingTile(center: Vector2): void {
        const distance = (x1: number, x2: number, y1: number, y2: number) => (x1 - x2) ** 2 + (y1 - y2) **2;

        const best = Object.values(this.tiles)
            .filter(tile => tile.value === 0)
            .sort((a, b) => distance(a.position.x, center.x, a.position.y, center.y) - distance(b.position.x, center.x, b.position.y, center.y));

        if (best.length >= 1) this.startingTile = best[0].position;
    }

    private getTileColor(x: number, y: number): string {
        const tile = this.get(x, y);
        const checkered = (x + (y % 2)) % 2 === 0;
        
        if (tile.covered) return checkered ? "#8ECC39" : "#A7D948";
        else return checkered ? "#D7B899" : "#E5C29F";
    }

    public reveal(x: number, y: number): void {
        const tile = this.get(x, y);
        if (!tile.covered || tile.flagged) return;
        tile.covered = false;

        if (tile.value === 0) {
            for(let xx = x - 2; xx <= x + 2; xx++) {
                for(let yy = y - 2; yy <= y + 2; yy++) {
                    if ((xx === x && yy === y)) continue;
                    this.generate(xx, yy);
                }
            }

            for(let xx = x - 1; xx <= x + 1; xx++) {
                for(let yy = y - 1; yy <= y + 1; yy++) {
                    if ((xx === x && yy === y)) continue;
                    this.reveal(xx, yy);
                }
            }
        }
    }

    private random(x: number, y: number): number {
        const hash = (x: number, y: number, seed: number): number => {
            let h = 0;
            let str = `${x}${y}${seed}`;
            for(let i = 0; i < str.length; i++) {
                h = Math.imul(31, h) + str.charCodeAt(i) | 0;
            };
            return Math.abs(h);
        }

        const seededRandom = (seed: number): number => {
            let x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        }

        const hashedValue = hash(x, y, 12837);
        return seededRandom(hashedValue);
    }
}

interface Tile {
    covered: boolean;
    flagged: boolean;
    value: number;
    position: Vector2;
}

interface Vector2 {
    x: number;
    y: number;
}