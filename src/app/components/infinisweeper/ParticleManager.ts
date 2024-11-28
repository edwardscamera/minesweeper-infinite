import { Particle } from "./Particle";

export class ParticleManager {
    private particles: Particle[] = [];
    
    public draw(g: CanvasRenderingContext2D) {
        this.particles.forEach(particle => particle.draw(g));
    }
    public update() {
        this.particles = this.particles.filter(particle => particle.update());
    }

    public createFlag(x: number, y: number): Particle {
        const particle = new Particle({ x, y });
        this.particles.push(particle);
        
        return particle;
    }
}