let canvas = null, ctx = null, requestAnimFrame = null;

// Set waves opacities
const wavesOpacities = [0.4, 0.3, 0.2, 0.1, 0.08, 0.06, 0.05, 0.04];

// Set parameters
let params = {
  AMPLITUDE_WAVES:0,
  AMPLITUDE_MIDDLE: 0,
  AMPLITUDE_SIDES: 0,
  OFFSET_SPEED: 120,
  SPEED: 3,
  OFFSET_WAVES: 35,
  NUMBER_WAVES: 3,
  COLOR: ["#DCFCFE", "#EDFAF4", "#FFFAD1"],
  NUMBER_CURVES: 2,
  OFFSET_CURVE: true,
  RESET: false
};

let speedInc = 0;

let settings = {
    height: 100
}

function render(canvasId, opts) {
    settings = Object.assign(settings, opts);

    wx.createSelectorQuery()
    .select(canvasId)
    .fields({ node: true, size: true })
    .exec((res) => {
      let _w = res[0].width;
      let _h = res[0].height;

      canvas = res[0].node
      ctx = canvas.getContext('2d')

      const dpr = wx.getSystemInfoSync().pixelRatio
      canvas.width = _w * dpr
      canvas.height = _h * dpr
      ctx.scale(dpr, dpr)

      run();
    })
}

function run() {
    ctx.clearRect(0, 0, canvas._width, canvas._height);
    params.AMPLITUDE_WAVES = canvas._height;
    params.AMPLITUDE_MIDDLE = canvas._height / 3;
    params.AMPLITUDE_SIDES = canvas._height / 2;
    // For each wave
    for (let j = params.NUMBER_WAVES - 1; j >= 0; j--) {
        // offset between waves
        let offset = speedInc + j * Math.PI * params.OFFSET_WAVES;

        // Color and increase gradually opacity
        ctx.fillStyle = params.COLOR[j];

        ctx.globalAlpha = wavesOpacities[j];

        // Oscillations
        // Define heights cubicBezier amplitudes

        // Speed amplitude variation between 0 and AMPLITUDE_SIDES ( half height window)
        // Set height amplitude of borders points (left and right of the window) -> no offset here
        let leftRange =
          (Math.sin(offset / params.OFFSET_SPEED + 2) + 1) /
            2 *
            params.AMPLITUDE_SIDES +
          (canvas._height - params.AMPLITUDE_SIDES) / 2;
        let rightRange =
          (Math.sin(offset / params.OFFSET_SPEED + 2) + 1) /
            2 *
            params.AMPLITUDE_SIDES +
          (canvas._height - params.AMPLITUDE_SIDES) / 2;

        // Speed amplitude variation between 0 and AMPLITUDE_WAVES ( height window)
        // Set height amplitude of the first and second points of a curve
        let leftCurveRange =
          (Math.sin(offset / params.OFFSET_SPEED + 2) + 1) /
            2 *
            params.AMPLITUDE_WAVES +
          (canvas._height - params.AMPLITUDE_WAVES) / 2;
        let rightCurveRange =
          (Math.sin(offset / params.OFFSET_SPEED + 1) + 1) /
            2 *
            params.AMPLITUDE_WAVES +
          (canvas._height - params.AMPLITUDE_WAVES) / 2;

        // Speed amplitude variation between 0 and AMPLITUDE_MIDDLE
        // Set height amplitude of the last point of a curve
        let endCurveRange =
          (Math.sin(offset / params.OFFSET_SPEED + 2) + 1) /
            2 *
            params.AMPLITUDE_MIDDLE +
          (canvas._height - params.AMPLITUDE_MIDDLE) / 2;

        // Reverse amplitude of the first and second points of a curve (only needed with 3 curves or more)
        let reverseLeftCurveRange =
          endCurveRange - rightCurveRange + endCurveRange;
        let reverseRightCurveRange =
          endCurveRange - leftCurveRange + endCurveRange;

        // Neutralise curves first and second point amplitude
        if (params.OFFSET_CURVE === false) {
          leftCurveRange = rightCurveRange;
          reverseRightCurveRange = reverseLeftCurveRange;
        }

        // Draw and fill path
        ctx.beginPath();

        // Draw first point from Left
        ctx.moveTo(0, leftRange);

        // Draw bezier curves based on amplitude

        // Draw each points of the first curve
        // bezierCurveTo() see https://www.w3schools.com/TAGs/canvas_beziercurveto.asp
        ctx.bezierCurveTo(
          canvas._width / (params.NUMBER_CURVES * 3),
          leftCurveRange,
          canvas._width / (params.NUMBER_CURVES * 3 / 2),
          rightCurveRange,
          canvas._width / params.NUMBER_CURVES,
          endCurveRange
        );

        // Draw each points of other curves if needed
        for (let i = 1; i < params.NUMBER_CURVES; i++) {
          // Reverse waves amplitude 1 / 2 times
          const finalRightCurveRange =
            i % 2 !== 0 ? rightCurveRange : reverseRightCurveRange;
          const finalLeftCurveRange =
            i % 2 !== 0 ? leftCurveRange : reverseLeftCurveRange;

          // Set points curve
          const secondPtX =
            canvas._width * (i / params.NUMBER_CURVES) +
            canvas._width / (params.NUMBER_CURVES * 3);
          const secondPtY =
            endCurveRange - finalRightCurveRange + endCurveRange;
          const thirdPtX =
            canvas._width * (i / params.NUMBER_CURVES) +
            canvas._width * (2 / (params.NUMBER_CURVES * 3));
          const thirdPtY =
            endCurveRange - finalLeftCurveRange + endCurveRange;
          const lastPtX = canvas._width * ((i + 1) / params.NUMBER_CURVES);
          const lastPtY =
            i === params.NUMBER_CURVES - 1 ? rightRange : endCurveRange;

          ctx.bezierCurveTo(
            secondPtX,
            secondPtY,
            thirdPtX,
            thirdPtY,
            lastPtX,
            lastPtY
          );
        }

        // Draw last lines

        ctx.lineTo(canvas._width, canvas._height);
        ctx.lineTo(0, canvas._height);
        ctx.lineTo(0, rightRange);

        ctx.closePath();
        ctx.fill();
        
      }
      
      // Speed
      speedInc += params.SPEED;
      requestAnimFrame(run)
}    

requestAnimFrame = (function() {
    return (
      function(callback) {
        setTimeout(callback, 1000 / 60);
      }
    );
})();


export default {
  render
}