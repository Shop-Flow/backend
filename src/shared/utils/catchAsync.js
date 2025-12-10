export const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// function if like this

// function catchAsync(fn) {
//   return function (req, res, next) {
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };
// }
