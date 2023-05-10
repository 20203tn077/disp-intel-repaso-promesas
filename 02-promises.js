// Simple sync function
const addOne = num => ++num

// Promise function
const addOnePromise = num => new Promise((resolve, reject) => {
    if (num >= 7) reject('Number is too big')
    else setTimeout(() => resolve(addOne(num)), 2000)
})

// Promise function + log
const addOnePromiseWLog = num => new Promise((resolve, reject) => {
    console.log(num)
    if (num >= 7) reject('Number is too big')
    else setTimeout(() => resolve(addOne(num)), 2000)
})


// Non-calling example
console.log(addOnePromise(5))

// Nesting hell example
addOnePromise(5).then(num => {
    console.log(num)
    addOnePromise(num).then(num => {
        console.log(num)
        addOnePromise(num).then(num => {
            console.log(num)
        })
    })
})

// .then hell example
addOnePromise(5)
.then(num => {
    console.log(num)
    return addOnePromise(num)
})
.then(num => {
    console.log(num)
    return addOnePromise(num)
})
.then(num => {
    console.log(num)
})

// Same but compact + catch example
addOnePromiseWLog(5)
.then(addOnePromiseWLog)
.then(addOnePromiseWLog)
.catch(console.log)