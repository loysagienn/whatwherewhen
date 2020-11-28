/** @jsx createElement */

import { createElement, PureComponent, createRef } from 'react';
import { cn } from 'app/utils';
import css from './Chart.styl';
import renderLine from './renderLine';

const getDevicePixelRatio = () => window.devicePixelRatio;

const setCanvasSize = (canvas, width, height, pixelRatio) => {
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
};

class TrackLines extends PureComponent {
    constructor(props) {
        super(props);

        this.canvasRef = createRef();
    }

    componentDidMount() {
        this.canvasCtx = this.canvasRef.current.getContext('2d');

        this.renderLines();
    }

    componentDidUpdate() {
        this.renderLines();
    }

    get canvasNode() {
        return this.canvasRef.current;
    }

    renderLines = () => {
        const { canvasCtx, canvasNode, props } = this;
        const { width, height, lines } = props;

        const pixelRatio = getDevicePixelRatio();

        setCanvasSize(canvasNode, width, height, pixelRatio);

        canvasCtx.lineWidth = 2 * pixelRatio;
        canvasCtx.lineCap = 'round';
        canvasCtx.lineJoin = 'round';

        lines.forEach(({ values, color, maxValue }) => renderLine(
            canvasCtx,
            values,
            width * pixelRatio,
            height * pixelRatio,
            color,
            maxValue,
        ));
    }

    render() {
        const { className, width, height } = this.props;

        return (
            <div
                className={cn(css.root, className)}
                style={{ width, height }}
            >
                <canvas
                    className={css.canvas}
                    style={{ width, height }}
                    ref={this.canvasRef}
                />
            </div>
        );
    }
}

export default TrackLines;
