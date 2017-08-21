const express = require ("express");
const server = express();

const PORT = process.env.NODE_ENV == "production"
    ? process.env.PORT || 8080
    : 8081;

const someJSON = require("./kladr.json");

server.use("/", express.static(__dirname + "/dist"));

server.get("/searchcity", (req, res) => {
    let { City, count = 0 } = req.query;

    let result = filterByAlphabet(filterByContain(City, someJSON));

    let { length } = result;

    count && result.splice(count);

    res.json({result, length});
});

function filterByContain(value, data) {
    return value
        ? data.filter(item => item.City.toLowerCase().indexOf(value.toLowerCase()) == 0)
        : data;
}

function filterByAlphabet(data) {
    let result = data
        .map((item, index) => {
            let value = item.City.toLowerCase();
            return { value, index };
        })
        .sort((a, b) => {
            if(a.value.indexOf(".") != -1) return 1;
            if(!isNaN(a.value[0])) return 1;
            return +(a.value > b.value) || +(a.value === b.value) - 1;
        })
        .map(item => data[item.index]);

    return result;
}

server.listen(PORT, () => {
    console.log("The server listens to the port %d", PORT);
});