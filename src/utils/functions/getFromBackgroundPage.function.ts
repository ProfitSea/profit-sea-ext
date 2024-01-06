// Converts the chrome runtime call into a promise to more easily fetch the results
function getFromBackgroundPage(payload: any, ignoreErrors = true) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(payload, (response) => {
      const error = chrome.runtime.lastError;
      if (error) {
        if (!ignoreErrors) {
          reject(error);
        } else {
          resolve(null); // Resolve as null or some error indicator if ignoring errors
        }
      } else if (response && response.success === false && !ignoreErrors) {
        reject(response.error);
      } else {
        resolve(response);
      }
    });
  });
}

export { getFromBackgroundPage };
