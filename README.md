# state-machine
![version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=0.2.00&x2=0)
![size](http://img.badgesize.io/digplan/tiny-state-machine/master/state-machine.js)

````js
import {StateMachine} from './state-machine.mjs'
const stateMachine = new StateMachine()
console.log (stateMachine.instanceid)

stateMachine.defineState ('START', (data) => {
    return new Promise((resolve, reject) => {
        data.test = 'test'
        console.log('started')
        setTimeout(()=>resolve('state2'), 1000)
    })
})

stateMachine.defineState ('state2', (data) => {
    data.test2 = 'test2'
    return new Promise((resolve, reject) => {
        console.log('state2 ' + JSON.stringify(data))
        setTimeout(()=>reject('had_error'), 1000)
    })
})

stateMachine.defineState ('state3', (data) => {
    data.test3 = 'test3'
    console.log('state3 ' + JSON.stringify(data))
    return 'END'
})

stateMachine.defineState ('had_error', (data) => {
    console.error('had an error, ending now')
    return 'END'
})

await stateMachine.start ('START')
````
