'use strict';

let CLOUD_WIDTH = 420;
let CLOUD_HEIGHT = 270;

let CLOUD_X = 100;
let CLOUD_Y = 10;

let GAP = 10;

let BAR_GAP = 50;
let TEXT_WIDTH = 50;
let BAR_WIDTH = 40;

let BAR_HEIGHT = 150;

let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

let getMaxElement = function (arr) {
  let maxElement = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.fillStyle = `#000`;

  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText(`Список результатов:`, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 4);

  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + GAP + TEXT_WIDTH
    );
    ctx.fillStyle = `hsl(237, 100%, ` + Math.floor(20 + (i - 0) * 20) + `%)`;
    if (names[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    }
    ctx.fillRect(
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + GAP + TEXT_WIDTH + 25 + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime),
        BAR_WIDTH,
        (BAR_HEIGHT * times[i]) / maxTime
    );
    ctx.fillStyle = `#000`;
    ctx.fillText(
        names[i],
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + GAP + TEXT_WIDTH + 35 + BAR_HEIGHT
    );
  }
};
