/**
 * Script Loader for Shopify Dawn Theme
 * This utility ensures that scripts are loaded in the correct order to prevent undefined variable errors.
 */

class ScriptLoader {
  /**
   * Load a script from the asset URL
   * @param {string} scriptName - The script file name (e.g., 'product-info.js')
   * @returns {Promise} Promise that resolves when the script is loaded
   */
  static loadScript(scriptName) {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (document.querySelector(`script[src*="${scriptName}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement("script");

      // Convert the Liquid template syntax to a proper URL at runtime
      const assetUrl = window.theme?.assets_url || "/assets/";
      script.src = `${assetUrl}/${scriptName}`;

      script.async = false; // Important: maintain execution order

      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error(`Failed to load script: ${scriptName}`));

      document.head.appendChild(script);
    });
  }

  /**
   * Helper to inject a variable definition into global scope
   * @param {string} name - Variable name
   * @param {any} value - Variable value
   */
  static injectGlobalVariable(name, value) {
    window[name] = value;
  }

  /**
   * Load the utilities required by product-info.js
   * This function ensures that all necessary utilities are loaded
   * before proceeding with component scripts
   */
  static loadProductDependencies() {
    // Ensure PUB_SUB_EVENTS exists with all required events
    if (!window.PUB_SUB_EVENTS) {
      window.PUB_SUB_EVENTS = {
        cartUpdate: "cart-update",
        cartError: "cart-error",
        productAdded: "product-added",
        quantityUpdate: "quantity-update",
        variantChange: "variant-change",
        cartDrawerOpen: "cart-drawer-open",
        optionValueSelectionChange: "option-value-selection-change",
      };
    } else if (!window.PUB_SUB_EVENTS.optionValueSelectionChange) {
      window.PUB_SUB_EVENTS.optionValueSelectionChange =
        "option-value-selection-change";
    }

    // Ensure subscribe/publish functions exist
    if (!window.subscribe) {
      const subscribers = {};

      window.subscribe = function (event, callback) {
        if (!subscribers[event]) {
          subscribers[event] = [];
        }
        subscribers[event].push(callback);

        return function unsubscribe() {
          subscribers[event] = subscribers[event].filter(
            (cb) => cb !== callback
          );
        };
      };

      window.publish = function (event, data) {
        if (!subscribers[event]) return;
        subscribers[event].forEach((callback) => {
          callback(data);
        });
      };
    }

    // Ensure HTMLUpdateUtility exists
    if (!window.HTMLUpdateUtility) {
      window.HTMLUpdateUtility = class HTMLUpdateUtility {
        static viewTransition(
          oldNode,
          newContent,
          preProcessCallbacks = [],
          postProcessCallbacks = []
        ) {
          preProcessCallbacks?.forEach((callback) => callback(newContent));

          const newNodeWrapper = document.createElement("div");
          HTMLUpdateUtility.setInnerHTML(newNodeWrapper, newContent.outerHTML);
          const newNode = newNodeWrapper.firstChild;

          // dedupe IDs
          const uniqueKey = Date.now();
          oldNode.querySelectorAll("[id], [form]").forEach((element) => {
            element.id && (element.id = `${element.id}-${uniqueKey}`);
            element.form &&
              element.setAttribute(
                "form",
                `${element.form.getAttribute("id")}-${uniqueKey}`
              );
          });

          oldNode.parentNode.insertBefore(newNode, oldNode);
          oldNode.style.display = "none";

          postProcessCallbacks?.forEach((callback) => callback(newNode));

          setTimeout(() => oldNode.remove(), 500);
        }

        static setInnerHTML(element, html) {
          element.innerHTML = html;
          element.querySelectorAll("script").forEach((oldScriptTag) => {
            const newScriptTag = document.createElement("script");
            Array.from(oldScriptTag.attributes).forEach((attribute) => {
              newScriptTag.setAttribute(attribute.name, attribute.value);
            });
            newScriptTag.appendChild(
              document.createTextNode(oldScriptTag.innerHTML)
            );
            oldScriptTag.parentNode.replaceChild(newScriptTag, oldScriptTag);
          });
        }
      };
    }

    // Ensure SectionId exists
    if (!window.SectionId) {
      window.SectionId = class SectionId {
        static parseId(qualifiedSectionId) {
          return qualifiedSectionId.split("__")[0];
        }

        static parseSectionName(qualifiedSectionId) {
          return qualifiedSectionId.split("__")[1];
        }

        static getIdForSection(sectionId, sectionName) {
          return `${sectionId}__${sectionName}`;
        }
      };
    }
  }

  /**
   * Load multiple scripts in the correct dependency order
   * @param {Array} scriptNames - Array of script file names
   * @returns {Promise} Promise that resolves when all scripts are loaded
   */
  static async loadScripts(scriptNames) {
    // First ensure all dependencies are loaded
    this.loadProductDependencies();

    // Then load all scripts sequentially to maintain order
    for (const scriptName of scriptNames) {
      await this.loadScript(scriptName);
    }
  }
}

// Expose to window
window.ScriptLoader = ScriptLoader;
