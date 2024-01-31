'use strict';

var tileCountX = 10;
var tileCountY = 8;
var tileWidth;
var tileHeight;
var imageCount = tileCountX * tileCountY;
var currentImage = 0;
var gridX = 0;
var gridY = 0;
var reverseVideo = false; // flag to reverse video every other time
var reverseDirection = false; // flag to reverse direction every iteration

var videos = ['data/video2.mp4', 'data/video3.mp4','data/video4.mp4', 'data/video5.mp4', 'data/video6.mp4', 'data/video7.mp4', 'data/video8.mp4', 'data/video9.mp4'];
var currentVideoIndex = 0;
var movie;

function preload() {
  movie = createVideo(videos[currentVideoIndex]);
  movie.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
}

function resize() {
  resizeCanvas(windowWidth, windowHeight);
  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
}

function draw() {
  if (movie.elt.readyState == 4) {
    var posX;

    if (!reverseDirection) {
      posX = tileWidth * gridX; // Normal direction
    } else {
      posX = tileWidth * (tileCountX - 1 - gridX); // Reverse direction
    }

    var posY = tileHeight * gridY;


    // draw video
    image(movie, posX, posY, tileWidth, tileHeight);

    // seek the video to the next time
    var nextTime = map(currentImage, 0, imageCount, 0, movie.duration());
    movie.time(nextTime);

    // increment currentImage for continuous playback
    currentImage++;

    // reset the grid position when reaching the end
    if (currentImage >= imageCount) {
      currentImage = 0;
      gridX = 0;
      gridY = 0;

      reverseVideo = !reverseVideo; // reverse the video flag
      reverseDirection = !reverseDirection; // reverse the direction flag

      // randomly select the next video
      currentVideoIndex = floor(random(videos.length));
      movie = createVideo(videos[currentVideoIndex]);
      movie.hide();
    }

    // update grid position
    gridY++;
    if (gridY >= tileCountY) {
      gridY = 0;
      gridX++;
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
