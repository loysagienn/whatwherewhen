const getCoords = (values, width, height, max) => {
    const min = 0;
    const valueHeight = max - min;
    const indexWidth = values.length - 1;

    const yCoef = (height / valueHeight);
    const xCoef = width / indexWidth;

    const coords = [];

    for (let i = 0; i < values.length; i++) {
        const x = i * xCoef;
        const y = (height) - ((values[i] - min) * yCoef);

        coords.push([x, y]);
    }

    return coords;
};

const getAngles = (coords) => {
    const angles = [];

    for (let i = 0; i < coords.length - 1; i++) {
        const [startX, startY] = coords[i];
        const [endX, endY] = coords[i + 1];

        const shiftX = endX - startX;
        const shiftY = endY - startY;

        angles.push(Math.atan(shiftY / shiftX));
    }

    angles.push(angles[angles.length - 1]);

    return angles;
};

const renderLine = (ctx, values, width, height, color, maxValue) => {
    const coords = getCoords(values, width, height, maxValue);
    const angles = getAngles(coords);

    const [firstX, firstY] = coords[0];

    ctx.beginPath();
    ctx.moveTo(Math.round(firstX), Math.round(firstY));
    let prevPointAngle = angles[0];

    for (let i = 1; i < coords.length; i++) {
        const [prevX, prevY] = coords[i - 1];
        const [currX, currY] = coords[i];
        const shiftX = currX - prevX;
        // const shiftY = currY - prevY;

        const currPointAngle = (angles[i - 1] + angles[i]) / 2;

        const shiftLength = shiftX / 2;
        // const shiftLength = Math.sqrt((shiftX * shiftX) + (shiftY * shiftY));

        const prevShiftX = prevX + (shiftLength * Math.cos(prevPointAngle));
        const prevShiftY = prevY + (shiftLength * Math.sin(prevPointAngle));

        const currShiftX = currX - (shiftLength * Math.cos(currPointAngle));
        const currShiftY = currY - (shiftLength * Math.sin(currPointAngle));

        // ctx.lineTo(Math.round(currX), Math.round(currY));
        ctx.bezierCurveTo(
            Math.round(prevShiftX),
            Math.round(prevShiftY),
            Math.round(currShiftX),
            Math.round(currShiftY),
            Math.round(currX),
            Math.round(currY),
        );

        prevPointAngle = currPointAngle;
    }

    ctx.strokeStyle = color;
    ctx.stroke();
};

export default renderLine;
