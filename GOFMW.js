function saveWidth(node) {
  let rect = node.getBoudingClientRect();
  node.__GOFMYPreviousWidth = rect.width;
  node.__GOFMYPreviousHeight = rect.height;
}
function hideNode(action) {
  let { node } = action;
  saveWidth(node);
  node.style.opacity = 0;
  node.style.width = 0;
  node.style.height = 0;
  node.style.pointerEvents = "none";
  node.style.visibility = "hidden";
}
function showNode(action) {
  let { node } = action;
  node.style.opacity = 1;
  node.style.width = node.__GOFMYPreviousWidth;
  node.style.height = node.__GOFMYPreviousHeight;
  node.style.pointerEvents = "all";
  node.style.visibility = undefined; // fallback default
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
        case "undo":
          showNode(action);
          queue.pop();
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
