export const catchAsyncErrors = (targetFunction) => {
    return (req, res,next) => {
        Promise.resolve(targetFunction(req, res,next)).catch(next)
    }
};