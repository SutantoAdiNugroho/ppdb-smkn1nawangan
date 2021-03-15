const asyncStorage = {
  setItem: (key, value) => {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem: (key) => {
    return new Promise(function (resolve, reject) {
      resolve(localStorage.getItem(key));
    });
  },
};

export default asyncStorage;
