class Heap {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  push(item) {
    this.heap[++this.size] = item;
    let index = this.size;
    while (index > 1) {
      const parentIndex = Math.floor(index / 2);
      if (this.heap[parentIndex][0] <= this.heap[index][0]) {
        break;
      }
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  pop() {
    const item = this.heap[1];
    this.heap[1] = this.heap[this.size--];
    let index = 1;
    while (2 * index <= this.size) {
      const leftChild = 2 * index;
      const rightChild = 2 * index + 1;
      let minChild = leftChild;
      if (rightChild <= this.size && this.heap[rightChild][0] < this.heap[leftChild][0]) {
        minChild = rightChild;
      }
      if (this.heap[index][0] <= this.heap[minChild][0]) {
        break;
      }
      this.swap(index, minChild);
      index = minChild;
    }
    return item;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  isEmpty() {
    return this.size === 0;
  }
}

const dijkstra = () => {
  const heap = new Heap(e);
  dists[k] = 0;
  heap.push([dists[k], k]);
  while (!heap.isEmpty()) {
    const [curDist, curNode] = heap.pop();
    if (dists[curNode] !== curDist) {
      continue;
    }
    for (const [nextDist, nextNode] of graph[curNode]) {
      if (dists[nextNode] <= dists[curNode] + nextDist) {
        continue;
      }
      dists[nextNode] = dists[curNode] + nextDist;
      heap.push([dists[nextNode], nextNode]);
    }
  }
};

const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [v, e] = input[0].split(' ').map(Number);
const k = Number(input[1]);
const dists = Array(v + 1).fill(Infinity);

const graph = [];
for (let i = 0; i < v + 1; i++) {
  graph.push([]);
}

for (let i = 2; i < 2 + e; i++) {
  const [start, end, dist] = input[i].split(' ').map(Number);
  graph[start].push([dist, end]);
}

dijkstra();
let answer = '';
for (let i = 1; i <= v; i++) {
  answer += dists[i] === Infinity ? 'INF\n' : `${dists[i]}\n`;
}

console.log(answer);
