export const sendData = async (data) => {
  const response = await fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};
