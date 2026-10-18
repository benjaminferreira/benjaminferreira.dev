/** sessionStorage key for the saved stack position */
export const POS_KEY = "paper-stack-pos";

/** id of the temporary style that hides the stack until it's restored */
export const HIDE_STYLE_ID = "paper-stack-restoring";

/**
 * Runs before the stack is painted. This takes over scroll restoration and keeps a saved position only
 * on reload or back/forward, and hides the stack if it's about to jump (from saved pos or hash).
 */
export const restoreScript = `(function () {
    try {
        history.scrollRestoration = "manual";
        var nav = performance.getEntriesByType("navigation")[0];
        var type = nav && nav.entryType;
        if (type !== "reload" && type !== "back_forward") sessionStorage.removeItem("${POS_KEY}");
        if (!sessionStorage.getItem("${POS_KEY}") && !location.hash) return;
        var style = document.createElement("style");
        style.id = "${HIDE_STYLE_ID}";
        style.textContent = "[data-paper-stack] { opacity: 0; }";
        document.head.appendChild(style);
        // never leave the page blank if something fails
        setTimeout(function () {
             style.remove();
        }, 2000);
    } catch (e) {}
})();`;
