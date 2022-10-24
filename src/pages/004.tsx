import { useEffect, useRef } from "react";

const Component = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    interface Point {
        x: number;
        y: number;
        step: number;
    }

    useEffect(() => {
        if (canvasRef.current) {
            const can = canvasRef.current;
            const ctx = can.getContext("2d")!;
            const points = Array.from(new Array<Point>(200)).map(() => {
                return {
                    x: Math.random() * 600,
                    y: Math.random() * 600,
                    step: Math.random() * 3 + 3,
                };
            });
            const draw = (p: Point) => {
                ctx.beginPath();
                ctx.rect(p.x, p.y, 3, 3);
                if (p.y < 600) {
                    p.y = p.y + p.step;
                }
                ctx.fillStyle = "#fff";
                ctx.fill();
                ctx.closePath();
            };

            const drawing = () => {
                requestAnimationFrame(() => {
                    ctx.clearRect(0, 0, 600, 600);
                    points.forEach((p) => {
                        draw(p);
                    });
                    drawing();
                });
            };
            requestAnimationFrame(drawing);
        }
    }, [canvasRef]);
    return (
        <>
            <canvas ref={canvasRef} width={600} height={600} />
        </>
    );
};

export default Component;
