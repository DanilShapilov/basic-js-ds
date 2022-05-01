const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
class ListNode {
  constructor(x) {
    this.value = x;
    this.next = null;
  }
}
function convertArrayToList(arr) {
  return arr.reverse().reduce((acc, cur) => {
    if (acc) {
      const node = new ListNode(cur);
      node.next = acc;
      return node;
    }

    return new ListNode(cur);
  }, null);
}
const initial = convertArrayToList([1, 2, 3])
removeKFromList(initial, 3)
console.log(JSON.stringify(initial));
function removeKFromList(l, k) {
  let listItem = l
  do {
    if (listItem.next?.value === k) {
      listItem.next = listItem.next?.next || null;
    }
    if (listItem.value === k) {
      listItem.value = listItem.next?.value || null;
      listItem.next = listItem.next?.next || null;
      continue;
    }
    listItem = listItem.next
  } while (listItem);
  return l
}

module.exports = {
  removeKFromList
};
