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
            const draw = (p: Point) => {};

            const drawing = () => {
                requestAnimationFrame(() => {
                    ctx.clearRect(0, 0, 600, 600);
                    ctx.beginPath();
                    points.forEach((p) => {
                        p.y = p.y > 600 ? 0 : p.y + p.step;
                        ctx.rect(p.x, p.y, 3, 3);
                        ctx.fillStyle = "#88888825";
                    });
                    ctx.fill();
                    ctx.closePath();
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
