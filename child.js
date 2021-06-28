setTimeout(() => {
    console.log('我是子进程的pid ' + process.pid);
    console.log('进程' + process.argv[2] + '执行');
}, 3000);