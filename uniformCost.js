var graphData = require('./graph.js')

graph = graphData[0];

function uniformCost(root) {
    console.log('start');
    const visited = new Set();
    let queue = [root];
    let counter=1;
    while(queue.length > 0) {
        console.log("ietration "+counter);
        counter++;
        console.log(queue);
        const minNode = queue.reduce((min,element) => {
            if((min[1]<element[1])) {
                return min;
            }
            else {
                return element
            }
        });
        const currNode = minNode[0][minNode[0].length-1];
        if(currNode == 'B') {
            return minNode;
        }
        else if(visited.has(currNode)) {
            queue=queue.filter((element) => {
                return element!==minNode;
           })
           continue;
        }
        else {
            visited.add(currNode);
            queue=queue.filter((element) => {
                return element!==minNode;
           })
            childs = graph.get(currNode);
            for (let i = 0; i < childs.length; i++) {
                const str = childs[i][0];
                if(!visited.has(str[str.length-1])) {
                    childs[i][1]+=minNode[1]; //adding cost
                    childs[i][0] = minNode[0]+childs[i][0]; //conatenation
                    queue.push(childs[i]);
                }
                
            }
        }
    }
}

const output = uniformCost(['A',0]);

console.log(output);
// for (let i = 0; i < output[1].length; i++) {
//     process.stdout.write(destination[1][i] + '=>');
// }
