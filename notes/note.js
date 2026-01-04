const myPromise = new Promise((resolve, reject) => {
    const success = false;

    if (success) {
        return resolve("This is from success!")
    }

    return reject("This is an error!")
})


// this is unresolved promise - this is just an object 
console.log(myPromise)


// way to use the promise -> using the .then().catch()
// here we call the promise as a function

myPromise.then((result) => {
    console.log(result)
}).catch((error) => {
    console.log("Error: ", error)
}).finally(() => {
    console.log("This runs regardless!")

})


// this runs first before the promise chain, i need to investigate
// using Async await
try {
    const result = await myPromise;
    console.log(result)
} catch (error) {
    console.log(error)
    console.log("----------------------------------------------------")
}
