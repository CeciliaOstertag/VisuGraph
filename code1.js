
var input = [
{"group": "nodes", "data": {"id": 0, "label": 0}, "position": {"x": 0, "y": 0}}, {"group": "nodes", "data": {"id": 1, "label": 1}, "position": {"x": 10, "y": 0}}, {"group": "nodes", "data": {"id": 2, "label": 2}, "position": {"x": 20, "y": 0}}, {"group": "nodes", "data": {"id": 3, "label": 3}, "position": {"x": 30, "y": 0}}, {"group": "nodes", "data": {"id": 4, "label": 4}, "position": {"x": 0, "y": 10}}, {"group": "nodes", "data": {"id": 5, "label": 5}, "position": {"x": 10, "y": 10}}, {"group": "nodes", "data": {"id": 6, "label": 6}, "position": {"x": 20, "y": 10}}, {"group": "nodes", "data": {"id": 7, "label": 7}, "position": {"x": 30, "y": 10}}, {"group": "edges", "data": {"id": "01", "label": "D", "proba":0.6, "source": 0, "target": 1}}, {"group": "edges", "data": {"id": "04", "label": "B", "proba":0.8,  "source": 0, "target": 4}}, {"group": "edges", "data": {"id": "12", "label": "D", "proba":0.65,  "source": 1, "target": 2}}, {"group": "edges", "data": {"id": "15", "label": "B", "proba":0.77,  "source": 1, "target": 5}}, {"group": "edges", "data": {"id": "10", "label": "G", "proba":0.99,  "source": 1, "target": 0}}, {"group": "edges", "data": {"id": "23", "label": "D", "proba":0.8,  "source": 2, "target": 3}}, {"group": "edges", "data": {"id": "26", "label": "B", "proba":0.55,  "source": 2, "target": 6}}, {"group": "edges", "data": {"id": "21", "label": "G", "proba":0.62,  "source": 2, "target": 1}}, {"group": "edges", "data": {"id": "37", "label": "B", "proba":0.91,  "source": 3, "target": 7}}, {"group": "edges", "data": {"id": "32", "label": "G", "proba":0.69,  "source": 3, "target": 2}}, {"group": "edges", "data": {"id": "45", "label": "D", "proba":0.99,  "source": 4, "target": 5}}, {"group": "edges", "data": {"id": "40", "label": "H", "proba":0.87,  "source": 4, "target": 0}}, {"group": "edges", "data": {"id": "56", "label": "D", "proba":0.98,  "source": 5, "target": 6}}, {"group": "edges", "data": {"id": "51", "label": "H", "proba":0.68,  "source": 5, "target": 1}}, {"group": "edges", "data": {"id": "54", "label": "G", "proba":0.74,  "source": 5, "target": 4}}, {"group": "edges", "data": {"id": "67", "label": "D", "proba":0.6,  "source": 6, "target": 7}}, {"group": "edges", "data": {"id": "62", "label": "H", "proba":0.8,  "source": 6, "target": 2}}, {"group": "edges", "data": {"id": "65", "label": "G", "proba":0.86, "source": 6, "target": 5}}, {"group": "edges", "data": {"id": "73", "label": "H", "proba":0.7,  "source": 7, "target": 3}}, {"group": "edges", "data": {"id": "76", "label": "G", "proba":0.96,  "source": 7, "target": 6}}
];

var fileURIs = new Map();
var cy = cytoscape({
	  container: document.getElementById('cy'),
	  boxSelectionEnabled: false,
      autounselectify: true,
      style: cytoscape.stylesheet()
	  .selector('node')
		  .css({
		    'height': 10,
		    'width': 10,
		    'shape': 'rectangle',
		    'background-fit': 'cover',
		    'border-color': '#000',
		    'border-width': 0,
		    'border-opacity': 0.5
		  })
		.selector('edge')
		  .css({
		    'width': 0.1,
		    'target-arrow-shape': 'triangle',
		    'arrow-scale': 0.1,
		    'line-color': '#000',
		    'target-arrow-color': '#000'
		  })
		  });

function showFile() {
   var fileInput = document.querySelector("input[type=file]");

   for (var i = 0; i < fileInput.files.length; i++) {
       var reader = new FileReader();
       reader.fileName = fileInput.files[i].name;
       reader.onload = function(readerEvent) {
           var url = readerEvent.target.result;
           var name = readerEvent.target.fileName;
           fileURIs.set(name.substr(0,1), url);
       }
       reader.readAsDataURL(fileInput.files[i]);
   }
   console.log("loading ok")
};

function initGraph(cy, input){
	  cy.add(input);

	nodes = cy.nodes();
	for (var j = 0; j < nodes.length; j++){
		id = nodes[j].data("id");
		nodes[j].style("background-image",fileURIs.get(id));
	}
	
	layout = cy.layout({name: 'preset', directed: true, padding: 10});
	layout.run();
	console.log("init ok");
}


function expandGraph(cy){
	nodes = cy.nodes();
	nodes.style('height',5);
	nodes.style('width',5);
	nodes.style('text-opacity',0.5);
	nodes.style('color','red');
	nodes.style('font-size',1);
	nodes.style('text-halign','center');
	nodes.style('text-valign','center');
	for (var j = 0; j < nodes.length; j++){
		nodes[j].style('label',nodes[j].data('label'));
	}
	
	edges = cy.edges();
	edges.style('text-opacity',0.5);
	edges.style('width',0.1);
	edges.style('arrow-scale',0.1);
	edges.style('color','red');
	edges.style('font-size',1);
	edges.style('curve-style','bezier');
	edges.style('control-point-step-size', 4);
	for (var j = 0; j < edges.length; j++){
		edges[j].style('label',edges[j].data('label')+" "+edges[j].data('proba'));
	}
	
	layout = cy.layout({name: 'preset', directed: true, padding: 10});
	layout.run();
	console.log("expanded");
}

function retractGraph(cy){
	nodes = cy.nodes();
	nodes.style('height',10);
	nodes.style('width',10);
	nodes.style('text-opacity',0);
	
	edges = cy.edges();
	edges.style('text-opacity',0);
	edges.style('width',0);
	edges.style('arrow-scale',0);
	
	layout = cy.layout({name: 'preset', directed: true, padding: 10});
	layout.run();
	console.log("retracted");
}

function filterEdges(cy){
	var thr = prompt("Threshold for edge filtering?");
	cy.remove('edge[proba < '+thr+']');
	nodes = cy.nodes();
	for (var j = 0; j < nodes.length; j++){
		if (nodes[j].connectedEdges().length == 0){
			cy.remove(nodes[j])
		}
	}
	cy.remove
	console.log("filtered")

}
