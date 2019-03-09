/**
 * **TODO**
 * - créer une interface graphique
 *  - créer un bouton pour activer la destruction on click ou bien la désactiver (toggle)
 *  - créer un bouton undo
 * - créer une option de presets
 */

function saveOriginalComputedStyles(node) {
  let styles = window.getComputedStyle(node);
  node.__GOFMWStyles = styles;
}
function hideNode(action) {
  let { node } = action;
  saveOriginalComputedStyles(node);
  node.style.opacity = 0;
  node.style.width = 0;
  node.style.height = 0;
  node.style.pointerEvents = "none";
  node.style.visibility = "hidden";
}
function showNode(node) {
  node.style = node.__GOFMWStyles;
}

function getOutOfMyWayQueueThing() {
  const queue = [];
  return {
    dispatch(action) {
      switch (action.type) {
        case "removed":
          hideNode(action);
          queue.push(action);
          break;
        case "undo": {
          let { node: lastHiddenNode } = queue.pop();
          showNode(lastHiddenNode);
          break;
        }
        default:
          break;
      }
    },
    pop() {
      return queue.pop();
    },
    peek() {
      return queue[queue.length - 1];
    },
    push(item) {
      return queue.push(item);
    },
    get length() {
      return queue.length;
    }
  };
}

let history = getOutOfMyWayQueueThing();

document.addEventListener("click", function(event) {
  let action = { type: "removed", node: event.target };

  history.dispatch(action);
});
