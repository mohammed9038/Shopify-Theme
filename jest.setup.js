// Setup file for Jest
// You can add any global setup for Jest tests here

// Example to setup DOM environment if needed
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
