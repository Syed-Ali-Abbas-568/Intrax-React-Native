
function buildGraph(routes) {
    const graph = {};

    for (const [route, stations] of Object.entries(routes)) {
        for (let i = 0; i < stations.length; i++) {
            if (!graph[stations[i]]) {
                graph[stations[i]] = [];
            }
            // Add next station in the same route
            if (i + 1 < stations.length) {
                graph[stations[i]].push({ station: stations[i + 1], route });
            }
            // Add switching routes at the same station
            for (const [otherRoute, otherStations] of Object.entries(routes)) {
                if (otherRoute !== route && otherStations.includes(stations[i])) {
                    graph[stations[i]].push({ station: stations[i], route: otherRoute });
                }
            }
        }
    }

    return graph;
}

function findPath(routes, start, end) {

    // Convert detailed routes to simplified format
    const simplifiedRoutes = Object.keys(routes).reduce((acc, routeKey) => {
        // Extract only the stations array for each route
        acc[routeKey] = routes[routeKey].stations;
        return acc;
    }, {});





    const graph = buildGraph(simplifiedRoutes)
    const queue = [{ station: start, path: [{ station: start, route: null }] }];
    const visited = new Set();

    while (queue.length > 0) {
        const { station, path } = queue.shift();

        if (station === end) {
            return path;
        }

        if (!visited.has(station)) {
            visited.add(station);

            for (const neighbor of graph[station]) {
                queue.push({
                    station: neighbor.station,
                    path: path.concat({ station: neighbor.station, route: neighbor.route })
                });
            }
        }
    }

    return null;
}


export default findPath;
// //Example Usage
// // Build the graph from routes
// const graph = buildGraph(routes);

// // Find path from 'stat2' to 'stat6'
// const startStation = 'stat2';
// const endStation = 'stat2';
// const path = findPath(graph, startStation, endStation);

// if (path) {
//     console.log('Path found:');
//     path.forEach((step, index) => {
//         console.log(`Step ${index + 1}: Station ${step.station} ${step.route ? `(Switch to route ${step.route})` : ''}`);
//     });
// } else {
//     console.log('No path found.');
// }
