/*
to understand this module wath this video or see the blog
https://fireship.io/courses/javascript/interview-graphs/
*/

const nodes = 'A B C D F L M O P R S T Z'.split(' ');

const routes = [
    ['A','Z',75],
    ['A','T',118],
    ['A','S',140],
    ['Z','O',71],
    ['O','S',151],
    ['T','L',111],
    ['L','M',70],
    ['M','D',75],
    ['D','R',120],
    ['S','R',90],
    ['S','F',99],
    ['F','B',211],
    ['R','C',146],
    ['R','P',97],
    ['C','P',138],
    ['P','B',101]

];
// implementing graph using adjacency list
const adjacencyList = new Map();

// Add node
function addNode(node) {
    adjacencyList.set(node,[]);
}
// adding edges
function addEdge(origin, destination,weight) {
    adjacencyList.get(origin).push([destination,weight]);
    adjacencyList.get(destination).push([origin,weight]);
}
nodes.forEach(addNode);
routes.forEach(route => addEdge(...route));
// console.log(adjacencyList);
module.exports = [adjacencyList,nodes];