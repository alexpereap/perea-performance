/**
 * Handles different error types
 */
class ResponseErrors {
  /**
   * The line `error500 = (res, e) => {` is defining a method named
   * `error500` within the `Errors` class. This method takes
   * two parameters `res` and `e`, and it is using arrow function
   * syntax to define the method. The method is responsible for
   * handling a specific type of error, in this case, a 500 Internal
   * Server Error. It returns a JSON response with a message
   * indicating that an unexpected error occurred, the error
   * message itself, and a success flag set to false.
   *
   * @method
   * @name error500
   * @kind property
   * @memberof Errors
   * @param {response} res
   * @param {error} e
   * @returns {response}
   */
  static error500 = (res, e) => res.status(500).json({
    message: 'An unexpected error occurred',
    error: e.message,
    success: false,
  });

  static error404 = (res) => res.status(404).json({
    message: 'Not found',
    success: false,
  });
}

module.exports = ResponseErrors;
