export class Camera {
    public position: Vector2 = { x: 0, y: 0 };
    public ppu: number = 64;

    public screenToWorld(screen: Vector2): Vector2 {
        return {
            x: screen.x / this.ppu + this.position.x,
            y: screen.y / this.ppu + this.position.y,
        };
    }

    public zoom(zoom: number) {
        this.ppu *= 0.9 ** zoom;
        this.ppu = Math.max(16, Math.min(256, this.ppu));
        this.roundPositionToNearestPixel();
    }

    private roundPositionToNearestPixel(): void {
        this.position.x = Math.round(this.position.x * this.ppu) / this.ppu;
        this.position.y = Math.round(this.position.y * this.ppu) / this.ppu;
    }
}

interface Vector2 {
    x: number;
    y: number;
}