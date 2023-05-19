// const { ToadScheduler, SimpleIntervalJob, AsyncTask } = require('toad-scheduler')
// const deviceController = require('../controller/device.controller')
//
// const scheduler = new ToadScheduler()
//
// const task = new AsyncTask(
//     'simple task',
//     () => { return deviceController.updateDeviceBySub('') .then((result) => { /* continue the promise chain */ }) },
//     (err: Error) => { /* handle error here */ }
// )
// const job = new SimpleIntervalJob({ hours: 1, }, task)
//
// scheduler.addSimpleIntervalJob(job)
//
// // when stopping your app
// scheduler.stop()