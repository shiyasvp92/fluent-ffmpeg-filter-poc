const http = require('http');
var ffmpeg = require('fluent-ffmpeg');
const vstack = require('fluent-ffmpeg-filters').vstack;
var fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

ffmpeg = vstack(ffmpeg);

ffmpeg('sample.mp4')
    .videoFilters('colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131')
    .videoFilters('colorlevels=rimax=0.902:gimax=0.902:bimax=0.902')
    .videoFilters('edgedetect=mode=colormix:high=0')
    // .complexFilter()
    .on('start', function (cmd) {
        console.log('Started ' + cmd);
    })
    .on('error', function (err) {
        console.log('An error occurred: ' + err.message);
    })
    .on('end', function () {
        console.log('Finished processing');
    })
    .output('outputfile.mp4')
    .run();