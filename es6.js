'use strict';


var fs = require('fs');
var child_process = require('child_process');
var client = require('superagent');

const p = data => {
    console.log(data)
    process.exit()
}


let url = 'http://nodejs.cn/api/process/event_exit.html';
let html = client.get(url).then(res => {
    // p(res.text)
});

let rs = require('os').cpus();
p(rs.length);


for (let i = 1; i <= 3; i++) {
    new Promise((resolve, reject) => {
        let workProcess = child_process.exec('node ' + __dirname + '/child.js ' + i, (err, out) => {
            if (err) {
                throw err;
            }
            resolve([out, workProcess]);
        });
    }).then(res => {
        console.log(res[0]);

    })
    console.log('master pid : ' + process.pid + '===> ' + i);


    // workProcess.on('exit', (code) => {
    // 	console.log('子进程退出了, code ' + code);
    // });


}













async function getlist() {
    new Promise((resolve, reject) => {
        setTimeout(() => {


            // 创建一个子进程
            let child = child_process.exec('dir', {
                'encoding': 'utf-8'
            }, (err, stdout) => {
                console.log(stdout.toString())
            });


            // 创建一个子进程

            const path = require('path');
            let child2 = child_process.fork(path.join(__dirname, 'a.js'), (err) => {
                if (err) {
                    throw err;
                }
            });


            child2.on('message', msg => {
                console.log('message from child', msg)
            });

            child2.send('hello child, master');



            return resolve('runing');
        }, 1000);
    }).then(res => {
        console.log(res);

    })


    console.log('11111');
}



return false;











let pro = new Promise((resolve, reject) => {
    // 需要异步执行的代码
    console.log('timeout is running')
    setTimeout(() => {
        let data = {
            'status': 200,
            'data': []
        };
        return resolve(data);

        // return reject(data)
    }, 5000);
});



async function asyncConsole() {

    await pro.then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })



    setTimeout(() => {
        console.log('42')
    }, 2000)

    console.log('next process')

    return { 'status': 0, 'msg': 'ok' };
}


var result = asyncConsole()


console.log(this)



setTimeout(() => {
    console.log(result)
}, 7000);