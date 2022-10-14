import { CustomAPIError } from "../errors/custom-error.js";

function errorHandlerMiddleware(err, req, res, next) {
  // return res.status(500).json({ msg: err });
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res
    .status(500)
    .json({ msg: `Something went wrong, please try again` });
}

export default errorHandlerMiddleware;
