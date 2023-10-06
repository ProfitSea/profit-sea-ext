export const createNotification = (title: string, message: string) => {
  chrome.runtime.sendMessage({
    type: "createNotification",
    data: {
      title,
      message,
    },
  });
};
