import { useEffect, useRef } from "react";
import "./index.css";

const Component = () => {
    interface Point {
        x: number;
        y: number;
    }
    interface snakegame {
        body: Array<Point>;
        food: Point;
        direction: number;
    }

    const { random, floor } = Math;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const move = [
        [-10, 0],
        [10, 0],
        [0, -10],
        [0, 10],
    ]; //上下左右

    const getRandomPoint = () => {
        return {
            x: floor(((random() * 10000) % 600) / 10) * 10,
            y: floor(((random() * 10000) % 600) / 10) * 10,
        };
    };

    let game: snakegame = {
        body: [],
        food: getRandomPoint(),
        direction: floor((random() * 10) % 4),
    };

    const init = (canvas2d: CanvasRenderingContext2D) => {
        game = {
            body: [],
            food: getRandomPoint(),
            direction: floor((random() * 10) % 4),
        };
        let head: Point = getRandomPoint();
        game.body.push(head);
        const draw = (point: Point) => {
            canvas2d.fillStyle = "green";
            canvas2d.fillRect(point.x, point.y, 20, 20);
        };
        const run = () => {
            draw(game.food);
            let h = game.body[0];
            const food = game.food;
            if (
                food.x == h.x + move[game.direction][0] &&
                food.y == h.y + move[game.direction][1]
            ) {
                game.body.unshift(food);
                game.food = getRandomPoint();
                console.log(game.body);
            }
            const needPos = JSON.parse(
                JSON.stringify(game.body.slice(0, game.body.length))
            );
            for (let i = 1; i < game.body.length; i++) {
                game.body[i] = needPos[i - 1];
            }
            h = game.body[0];
            h.x = (h.x + move[game.direction][0] + 600) % 600;
            h.y = (h.y + move[game.direction][1] + 600) % 600;
            game.body.forEach((p) => {
                draw(p);
            });
            requestAnimationFrame(() => {
                canvas2d.clearRect(0, 0, 600, 600);
                run();
            });
        };
        requestAnimationFrame(() => {
            run();
        });
    };

    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "a":
                game.direction = 0;
                break;
            case "d":
                game.direction = 1;
                break;
            case "w":
                game.direction = 2;
                break;
            case "s":
                game.direction = 3;
                break;
        }
    });

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const canvas2d = canvas.getContext("2d")!;
            init(canvas2d);
        }
    });

    return (
        <>
            <canvas ref={canvasRef} width={600} height={600} />
        </>
    );
};

export default Component;
