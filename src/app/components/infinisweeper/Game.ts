import { Board } from "./Board";
import { Camera } from "./Camera";

export class Game {
    private viewport: HTMLCanvasElement;
    private g: CanvasRenderingContext2D;

    private board = new Board();
    private camera = new Camera();

    constructor(viewport: HTMLCanvasElement) {
        this.viewport = viewport;
        this.g = viewport.getContext("2d") as CanvasRenderingContext2D;
        window.requestAnimationFrame(this.processFrame.bind(this));

        this.viewport.addEventListener("mousedown", () => {
            const onMouseMove = (event: MouseEvent) => {
                this.camera.position.x -= event.movementX / this.camera.ppu;
                this.camera.position.y -= event.movementY / this.camera.ppu;
            }
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", () => {
                window.removeEventListener("mousemove", onMouseMove);
            }, { once: true });
        });

        this.viewport.addEventListener("mouseup", (event: MouseEvent) => {
            const mousePosition = this.camera.screenToWorld({
                x: event.clientX,
                y: event.clientY,
            });
            this.board.reveal(Math.floor(mousePosition.x), Math.floor(mousePosition.y));
        });
    }

    private processFrame(): void {
        this.update();
        this.draw();

        window.requestAnimationFrame(this.processFrame.bind(this));
    }

    private update(): void {

    }

    public draw(): void {
        this.g.resetTransform();
        this.g.clearRect(0, 0, this.viewport.width, this.viewport.height);
        this.g.scale(this.camera.ppu, this.camera.ppu);

        const width = this.viewport.width / this.camera.ppu;
        const height = this.viewport.height / this.camera.ppu;
        
        this.g.translate(-this.camera.position.x, -this.camera.position.y);

        this.board.draw(this.g, {
            x: Math.floor(this.camera.position.x),
            y: Math.floor(this.camera.position.y),
        }, {
            x: this.camera.position.x + width,
            y: this.camera.position.y + height
        });
    }
}