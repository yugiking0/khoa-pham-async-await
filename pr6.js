var newPromise = new Promise((resolve, reject) => {
  resolve("Resolve")
})

newPromise
  .then(() => {
    console.log("Successfully!")
  })
  .catch(() => {
    console.log("Failure!")
  })
  .finally(() => {
    console.log("Done!")
  })