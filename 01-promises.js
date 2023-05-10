console.log('Holi UwU')

// Simple sync function
const addOne = num => ++num

// Callback function
const addOneCallback = (num, callback) => setTimeout(() => callback(addOne(num)), 2000)

// Should be lower than 7 function
const addOneIfLowerThan7 = (num, callback) => {
    if (num >= 7) callback('Number is too big')
    else setTimeout(() => callback(null, addOne(num)), 2000)
}


// Sync example
console.log(addOne(0))

// Callback example
addOneCallback(1, console.log)

// Shitty example
addOneIfLowerThan7(5, (error, num) => {
    if (error) console.log(error)
    else {
        console.log(num)
        addOneIfLowerThan7(num, (error, num) => {
            if (error) console.log(error)
            else {
                console.log(num)
                addOneIfLowerThan7(num, (error, num) => {
                    if (error) console.log(error)
                    else {
                        console.log(num)
                    }
                })
            }
        })
    }
})