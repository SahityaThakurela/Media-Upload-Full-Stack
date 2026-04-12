const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch
        ((err) => next(err))
    }
}

export { asyncHandler }














// METHOD -> 2 (not used in the industry)





// // const asyncHandler = (fn) => {async () => {}}
// // const asyncHandler = (fn) => async () => {}
//     // in js i should learn that 


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json ({
//             success: false,
//             message: err.message
//         })
//     }
// }