const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
// class BinarySearchTree {

//   root() {
//     throw new NotImplementedError('Not implemented');
//     // remove line with error and write your code here
//   }

//   add(/* data */) {
//     throw new NotImplementedError('Not implemented');
//     // remove line with error and write your code here
//   }

//   has(/* data */) {
//     throw new NotImplementedError('Not implemented');
//     // remove line with error and write your code here
//   }

//   find(/* data */) {
//     throw new NotImplementedError('Not implemented');
//     // remove line with error and write your code here
//   }

//   remove(/* data */) {
//     throw new NotImplementedError('Not implemented');
//     // remove line with error and write your code here
//   }

//   min() {
//     throw new NotImplementedError('Not implemented');
//     // remove line with error and write your code here
//   }

//   max() {
//     throw new NotImplementedError('Not implemented');
//     // remove line with error and write your code here
//   }
// }

class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.data = value;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  add(value) {
    const newNode = new Node(value)
    if (this.rootNode === null) {
      this.rootNode = newNode
      return this
    }

    const insertValue = value
    let pointer = this.rootNode

    do {
      const currentValue = pointer.data

      if (insertValue < currentValue) {
        const left = pointer.left
        if (left === null) {
          pointer.left = newNode
          break
        } else {
          pointer = left
        }
      } else if (insertValue > currentValue) {
        const right = pointer.right
        if (right === null) {
          pointer.right = newNode
          break
        } else {
          pointer = right
        }
      } else {
        return currentValue
        throw new Error('You try to insert duplicate')
      }

    } while (true);
    return newNode
  }
  has(value) {
    if (this.rootNode === null) return false;

    const lookupValue = value
    let pointer = this.rootNode

    do {
      const currentValue = pointer.data

      if (lookupValue === currentValue) {
        return true
      } else if (lookupValue < currentValue) {
        pointer = pointer.left
      } else if (lookupValue > currentValue) {
        pointer = pointer.right
      }

    } while (pointer);
    return false
  }
  remove(value) {
    if (!this.rootNode) {
      return false;
    }
    let currentNode = this.rootNode;
    let parentNode = null;
    while (currentNode) {
      if (value < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (currentNode.data === value) {
        //We have a match, get to work!

        //Option 1: No right child: 
        if (currentNode.right === null) {
          if (parentNode === null) {
            this.rootNode = currentNode.left;
          } else {

            //if parent > current value, make current left child a child of parent
            if (currentNode.data < parentNode.data) {
              parentNode.left = currentNode.left;

              //if parent < current value, make left child a right child of parent
            } else if (currentNode.data > parentNode.data) {
              parentNode.right = currentNode.left;
            }
          }

          //Option 2: Right child which doesnt have a left child
        } else if (currentNode.right.left === null) {
          currentNode.right.left = currentNode.left;
          if (parentNode === null) {
            this.rootNode = currentNode.right;
          } else {

            //if parent > current, make right child of the left the parent
            if (currentNode.data < parentNode.data) {
              parentNode.left = currentNode.right;

              //if parent < current, make right child a right child of the parent
            } else if (currentNode.data > parentNode.data) {
              parentNode.right = currentNode.right;
            }
          }

          //Option 3: Right child that has a left child
        } else {

          //find the Right child's left most child
          let leftmost = currentNode.right.left;
          let leftmostParent = currentNode.right;
          while (leftmost.left !== null) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }

          //Parent's left subtree is now leftmost's right subtree
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;

          if (parentNode === null) {
            this.rootNode = leftmost;
          } else {
            if (currentNode.data < parentNode.data) {
              parentNode.left = leftmost;
            } else if (currentNode.data > parentNode.data) {
              parentNode.right = leftmost;
            }
          }
        }
        return true;
      }
    }
  }
  root() {
    return this.rootNode
  }
  find(value) {
    if (this.rootNode === null) return null;

    const lookupValue = value
    let pointer = this.rootNode

    do {
      const currentValue = pointer.data

      if (lookupValue === currentValue) {
        return pointer
      } else if (lookupValue < currentValue) {
        pointer = pointer.left
      } else if (lookupValue > currentValue) {
        pointer = pointer.right
      }

    } while (pointer);
    return null
  }
  min() {
    if (this.rootNode === null) return false;

    let pointer = this.rootNode

    do {
      const currentValue = pointer.data

      if (pointer.left != null) {
        pointer = pointer.left
      } else {
        return currentValue
      }

    } while (pointer);
    return false
  }

  max() {
    if (this.rootNode === null) return false;

    let pointer = this.rootNode

    do {
      const currentValue = pointer.data

      if (pointer.right != null) {
        pointer = pointer.right
      } else {
        return currentValue
      }

    } while (pointer);
    return false
  }
}

const tree = new BinarySearchTree();
tree.add(9);
tree.add(14);
tree.add(2);
tree.add(6);
tree.add(128);
tree.add(8);
tree.add(31);
tree.add(54);
tree.add(1);
console.log(JSON.stringify(tree, null, 2));

tree.remove(14);
tree.remove(8);
tree.remove(9);
console.log(JSON.stringify(tree, null, 2));

// console.log(tree.has(14), false);
// console.log(tree.has(8), false);
// console.log(tree.has(9), false);
console.log(tree.has(2), true);
console.log(tree.has(6), true);
console.log(tree.has(128), true);
console.log(tree.has(31), true);
console.log(tree.has(54), true);
console.log(tree.has(1), true);

module.exports = {
  BinarySearchTree
};