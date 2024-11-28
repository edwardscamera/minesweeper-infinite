import { Vector2 } from "./Vector2";

export class Particle {
    public position: Vector2 = { x: 0, y: 0 };
    public velocity: Vector2 = { x: 0, y: 0 };
    public acceleration: Vector2 = { x: 0, y: 0 };
    public life: number = 500;
    public color: string = "#fff";

    private creationTime: number = performance.now();

    constructor(position: Vector2) {
        this.position = position;
    }

    public draw(g: CanvasRenderingContext2D): void {
        if (this.isDead()) return;

        g.fillStyle = this.color;
        g.fillRect(this.position.x, this.position.y, 1, 1);
    }
    public update(): void {
        if (this.isDead()) return;

        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    public isDead(): boolean {
        return performance.now() > this.creationTime + this.life;
    }
}