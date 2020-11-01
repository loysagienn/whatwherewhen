const wait = (timeout, ...args) => new Promise((resolve) => setTimeout(() => resolve(...args), timeout));

export default wait;
