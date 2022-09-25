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

    return (
        <>
            <canvas width={600} height={600} />
        </>
    );
};

export default Component;
