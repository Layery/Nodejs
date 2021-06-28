var client = require('superagent');
var os = require("os");
var querystring = require('querystring');
var cheerio = require('cheerio');
var fs = require('fs');


var baseUrl = 'https://www.nwxs7.com/news/50026';


index = 1;

function getHeader(html) {
    html.forEach(row => {
        var $ = cheerio.load(row);
        $('.txList').find('img').each((i, el) => {
            index += 1;

            var imgUrl = el.attribs.src;
            if (imgUrl == undefined) {
                return true;
            }
            var img = 'http:' + imgUrl;
            // console.log(index + '====>' + img);
            setTimeout(() => {
                console.log('sleep 3s')
            }, 3000)
            client
                .get(img)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    let newName = res.req.path.substring(13, 20);
                    fs.writeFile('./imgs/' + newName + '.jpg', res.body, (err) => {
                        if (err) {
                            throw err
                        }
                    })
                })
        })

    });
}


function getContent(html) {
    html.forEach(row => {
        var $ = cheerio.load(row);
        let content = $(".wodetupian").text();
        fs.appendFile('./xingbiqi_note.log', content+os.EOL, (err, res) => {
            if (err) {
                throw err
            }
        });
    })
}



function getPageAsync(url) {
    return new Promise(function(resolve, reject) {
        client
            .get(url)
            .end((req, res) => {
                if (res.status == 200) {
                    let text = res.text.toString();
                    return resolve(text);
                } else {
                    return reject(res);
                }
            });
    })
}


var promiseList = [];



for (let i = 0, cnt = 72; i <= cnt; i++) {
    if (!i) {
        url = baseUrl + '.html';
    } else {
        url = baseUrl + '_' + (i + 1) + '.html';
    }
    promiseList.push(getPageAsync(url));
}


Promise
    .all(promiseList)
    .then((res) => {
        // getHeader(res)
        getContent(res)
    });