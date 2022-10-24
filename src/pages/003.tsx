import { MouseEvent, useRef } from "react";
import "./003.css";

const Component = () => {
    interface Point {
        x: number;
        y: number;
    }
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawList: Function[] = [];
    let painting = false;
    let startPoint: Point = { x: 0, y: 0 };

    const getCanvas2D = () => {
        const c = canvasRef.current!;
        const canvas2D = c.getContext("2d")!;
        return { canvas2D, c };
    };

    const clear = () => {
        const { canvas2D, c } = getCanvas2D()!;
        canvas2D.clearRect(0, 0, c.width, c.height);
    };

    const clearcanvas = () => {
        clear();
        drawList.length = 0;
    };

    const draw = (frist: Point, end: Point) => {
        const { canvas2D, c } = getCanvas2D()!;
        canvas2D.beginPath();
        canvas2D.moveTo(frist.x, frist.y);
        canvas2D.lineTo(end.x, end.y);
        canvas2D.lineWidth = 6;
        canvas2D.lineJoin = "round";
        canvas2D.shadowColor = "#000000";
        canvas2D.shadowBlur = 4;
        canvas2D.stroke();
        canvas2D.closePath();
    };

    const mousedown = (e: MouseEvent) => {
        painting = true;
        const { canvas2D, c } = getCanvas2D()!;
        const rect = c.getBoundingClientRect();
        const x = e.clientX - rect.left * (c.width / rect.width);
        const y = e.clientY - rect.top * (c.height / rect.height);
        startPoint = {
            x: x,
            y: y,
        };
    };

    const mousemoveEven = (e: MouseEvent) => {
        if (painting) {
            const { canvas2D, c } = getCanvas2D()!;
            const rect = c.getBoundingClientRect();
            const x = e.clientX - rect.left * (c.width / rect.width);
            const y = e.clientY - rect.top * (c.height / rect.height);
            const newPoint: Point = { x: x, y: y };
            const frist = JSON.parse(JSON.stringify(startPoint));
            const drawing = () => draw(frist, newPoint);
            drawList.push(drawing);
            drawing();
            startPoint = newPoint;
        }
    };

    const reDraw = (i: number) => {
        if (i == drawList.length) return;
        setTimeout(() => {
            drawList[i]();
            reDraw(i + 1);
        }, 20);
    };

    const playback = () => {
        clear();
        requestAnimationFrame(() => {
            reDraw(0);
        });
    };

    return (
        <>
            <canvas
                onMouseDown={mousedown}
                onMouseUp={() => (painting = false)}
                onMouseMove={mousemoveEven}
                ref={canvasRef}
                width={600}
                height={600}
            />
            <div>
                <span className="button" onClick={clearcanvas}>
                    清空
                </span>
                <span className="button" onClick={playback}>
                    回放
                </span>
            </div>
        </>
    );
};

export default Component;
