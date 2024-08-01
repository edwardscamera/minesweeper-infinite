export class Camera {
    public position: Vector2 = { x: 0, y: 0 };
    public ppu: number = 64;

    public screenToWorld(screen: Vector2): Vector2 {
        return {
            x: screen.x / this.ppu + this.position.x,
            y: screen.y / this.ppu + this.position.y,
        };
    }
}

interface Vector2 {
    x: number;
    y: number;
}