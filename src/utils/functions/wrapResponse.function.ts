export function wrapResponse(promise: any, sendResponse: any) {
  promise
    .then((response: any) => {
      return sendResponse({
        success: true,
        data: response,
      });
    })
    .catch((error: any) => {
      return sendResponse({
        success: false,
        error: error.message,
      });
    });
    return true;
}
