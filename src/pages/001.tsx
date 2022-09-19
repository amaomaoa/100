// square
import { useRef, MouseEvent } from "react";
import "./index.css";

const Component = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const draws: Function[] = [];

    const getCtx = () => {
        const c = canvasRef.current!;
        const ct = c.getContext("2d")!;
        return { ct, c };
    };
    const draw = (x: number, y: number) => {
        const { ct } = getCtx()!;
        ct.beginPath();
        ct.strokeRect(x, y, 50, 50);
        if (y < 600) draws.push(() => draw(x, y + 1));
    };

    const drawing = () => {
        const { ct } = getCtx()!;
        ct.clearRect(0, 0, 600, 600);
        const run = [...draws];
        draws.length = 0;
        run.forEach((f) => f());
        requestAnimationFrame(() => {
            drawing();
        });
    };
    requestAnimationFrame(() => {
        drawing();
    });

    const click = (e: MouseEvent) => {
        const { ct, c } = getCtx();
        const rect = c.getBoundingClientRect();
        const x = e.clientX - rect.left * (c.width / rect.width);
        const y = e.clientY - rect.top * (c.height / rect.height);
        draws.push(() => draw(x, 0 - 50));
    };

    return (
        <>
            <canvas onClick={click} width={600} height={600} ref={canvasRef} />
        </>
    );
};

export default Component;
