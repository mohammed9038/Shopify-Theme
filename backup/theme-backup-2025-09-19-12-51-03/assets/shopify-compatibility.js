/**
 * Mock Shopify object for compatibility with theme code
 */

window.Shopify = window.Shopify || {};

// Add CountryProvinceSelector functionality
Shopify.CountryProvinceSelector = function (
  country_domid,
  province_domid,
  options
) {
  this.countryEl = document.getElementById(country_domid);
  this.provinceEl = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(
    options.hideElement || province_domid
  );

  this.countryEl.addEventListener("change", this.countryHandler.bind(this));

  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function () {
    const value = this.countryEl.getAttribute("data-default");
    if (value && this.countryEl.options.length > 0) {
      for (let i = 0; i < this.countryEl.options.length; i++) {
        if (this.countryEl.options[i].value === value) {
          this.countryEl.selectedIndex = i;
          break;
        }
      }
    }
    this.countryHandler();
  },

  initProvince: function () {
    const value = this.provinceEl.getAttribute("data-default");
    if (value && this.provinceEl.options.length > 0) {
      for (let i = 0; i < this.provinceEl.options.length; i++) {
        if (this.provinceEl.options[i].value === value) {
          this.provinceEl.selectedIndex = i;
          break;
        }
      }
    }
  },

  countryHandler: function () {
    const opt = this.countryEl.options[this.countryEl.selectedIndex];
    const raw = opt.getAttribute("data-provinces");
    const provinces = JSON.parse(raw);

    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length) {
      this.setOptions(this.provinceEl, provinces);
      this.provinceContainer.style.display = "";
    } else {
      this.provinceContainer.style.display = "none";
    }
  },

  clearOptions: function (selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },

  setOptions: function (selector, values) {
    for (let i = 0; i < values.length; i++) {
      const opt = document.createElement("option");
      opt.value = values[i][0];
      opt.innerHTML = values[i][1];
      selector.appendChild(opt);
    }
  },
};

// Shopify money format
Shopify.formatMoney = function (cents, format) {
  if (typeof cents === "string") cents = cents.replace(".", "");
  let value = ""; // Changed to let
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || "${{amount}}";

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = precision || 2;
    thousands = thousands || ",";
    decimal = decimal || ".";

    if (isNaN(number) || number === null) return 0;

    number = (number / 100.0).toFixed(precision);

    const parts = number.split(".");
    const dollars = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      "$1" + thousands
    );
    const cents = parts[1] ? decimal + parts[1] : "";

    return dollars + cents;
  }
  switch (formatString.match(placeholderRegex)[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      break;
    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;
    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      break;
    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ".", ",");
      break;
    case "amount_no_decimals_with_space_separator":
      value = formatWithDelimiters(cents, 0, " ");
      break;
    case "amount_with_apostrophe_separator":
      value = formatWithDelimiters(cents, 2, "'");
      break;
  }

  return formatString.replace(placeholderRegex, value);
};

// Routes
window.routes = window.routes || {
  cart_add_url: "/cart/add",
  cart_change_url: "/cart/change",
  cart_update_url: "/cart/update",
  cart_url: "/cart",
  predictive_search_url: "/search/suggest",
};

// Cart Performance
window.CartPerformance = window.CartPerformance || {
  setTimingEvent: function (name, time) {
    console.log(`Cart Performance: ${name} - ${time}`);
  },
  getTimeEventStart: function (name) {
    return performance.now();
  },
  logToConsole: function (msg) {
    console.log(`Cart Performance Log: ${msg}`);
  },
};
