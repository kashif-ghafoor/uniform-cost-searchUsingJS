/*
    each node is represeted by an pair of node/path and cost 
    i.e [path/node,cost]
    lets say there is a path A -> B -> C -> D -> E and cummulative cost 
    to reach the destination is 100. I represented path and cost like this
    [ABCDE,100]
    and if there is a node A and have cost 0 it is represented as 
    [A,0]
    queue keeps track of nodes and their paths 
    I represented queue as the array of array
    i.e [[ [ 'AZ', 75 ], [ 'AT', 118 ], [ 'AS', 140 ] ]]
*/
var graphData = require('./graph.js')
//importing graph from graph.js module
graph = graphData[0];

function uniformCost(root) {
    //visited set keeps track of all visisted node in graph
    const visited = new Set(); 
    //queue is used to keep the cost and path of every node
    //that we have visited
    // it plays main role in algorithm
    let queue = [root]; 
    let counter=1;//to keep track of ietration in which graph is solved
    while(queue.length > 0) {
        console.log("ietration "+counter); 
        counter++;
        //printing the status of queue at each ietration    
        console.log(queue); 
        //applying reduce function on queue and it returns the node
        //that have minimum cost
        const minNode = queue.reduce((min,element) => {
            if((min[1]<element[1])) {
                return min;
            }
            else {
                return element
            }
        });
        //let's I have traversed nodes in this way A->B->C it will be 
        //represented in this way in queue [ABC,cost] following line get
        //the last character path ABC i. C which tells us that it is current node
        const currNode = minNode[0][minNode[0].length-1];
        // 'B' is goal node if the current node(i.e currNode) is  'B then 
        //return path and const in form of array i.e [path,cost]
        if(currNode == 'B') {
            return minNode;
        }
        // if I have visited the current node before then we will drop the current
        // minimum selected node continue to next ietraion
        else if(visited.has(currNode)) {
            // I used filter function to drop a node from queue
            queue=queue.filter((element) => {
                return element!==minNode;
           })
           continue;
        }
        else {
            // add current node to visited 
            visited.add(currNode);
            // drop the current minium selected node 
            queue=queue.filter((element) => {
                return element!==minNode;
           })
           //explore the childs of current minimum selected node
            childs = graph.get(currNode);
            //adding path and cost to child nodes because 
            //we have dropped the parent node
            for (let i = 0; i < childs.length; i++) {
                const str = childs[i][0];
                if(!visited.has(str[str.length-1])) {
                    childs[i][1]+=minNode[1]; //adding cost
                    childs[i][0] = minNode[0]+childs[i][0]; //conatenation
                    queue.push(childs[i]); //adding the child to queue
                }
                
            }
        }
    }
}
//calling uniformCost function
const output = uniformCost(['A',0]);

//formatting output to print on console
path = output[0];
cost = output[1];
console.log("\npath found by uniform cost search algorithm is: \n")
for (let i = 0; i < path.length; i++) {
    process.stdout.write(path[i]);
    if(i !== path.length-1) {
        process.stdout.write(" => ");

    }
}
console.log("\n cost of path is: ",cost);
