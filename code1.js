
var input = [{"group": "nodes", "data": {"id": 0, "label": 0}, "position": {"x": 0, "y": 0}}, {"group": "nodes", "data": {"id": 1, "label": 1}, "position": {"x": 10, "y": 0}}, {"group": "nodes", "data": {"id": 2, "label": 2}, "position": {"x": 20, "y": 0}}, {"group": "nodes", "data": {"id": 3, "label": 3}, "position": {"x": 30, "y": 0}}, {"group": "nodes", "data": {"id": 4, "label": 4}, "position": {"x": 0, "y": 10}}, {"group": "nodes", "data": {"id": 5, "label": 5}, "position": {"x": 10, "y": 10}}, {"group": "nodes", "data": {"id": 6, "label": 6}, "position": {"x": 20, "y": 10}}, {"group": "nodes", "data": {"id": 7, "label": 7}, "position": {"x": 30, "y": 10}}, {"group": "edges", "data": {"id": "01", "label": "D", "source": 0, "target": 1}}, {"group": "edges", "data": {"id": "04", "label": "B", "source": 0, "target": 4}}, {"group": "edges", "data": {"id": "12", "label": "D", "source": 1, "target": 2}}, {"group": "edges", "data": {"id": "15", "label": "B", "source": 1, "target": 5}}, {"group": "edges", "data": {"id": "10", "label": "G", "source": 1, "target": 0}}, {"group": "edges", "data": {"id": "23", "label": "D", "source": 2, "target": 3}}, {"group": "edges", "data": {"id": "26", "label": "B", "source": 2, "target": 6}}, {"group": "edges", "data": {"id": "21", "label": "G", "source": 2, "target": 1}}, {"group": "edges", "data": {"id": "37", "label": "B", "source": 3, "target": 7}}, {"group": "edges", "data": {"id": "32", "label": "G", "source": 3, "target": 2}}, {"group": "edges", "data": {"id": "45", "label": "D", "source": 4, "target": 5}}, {"group": "edges", "data": {"id": "40", "label": "H", "source": 4, "target": 0}}, {"group": "edges", "data": {"id": "56", "label": "D", "source": 5, "target": 6}}, {"group": "edges", "data": {"id": "51", "label": "H", "source": 5, "target": 1}}, {"group": "edges", "data": {"id": "54", "label": "G", "source": 5, "target": 4}}, {"group": "edges", "data": {"id": "67", "label": "D", "source": 6, "target": 7}}, {"group": "edges", "data": {"id": "62", "label": "H", "source": 6, "target": 2}}, {"group": "edges", "data": {"id": "65", "label": "G", "source": 6, "target": 5}}, {"group": "edges", "data": {"id": "73", "label": "H", "source": 7, "target": 3}}, {"group": "edges", "data": {"id": "76", "label": "G", "source": 7, "target": 6}}];

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
	edges.style('control-point-step-size', 1);
	for (var j = 0; j < edges.length; j++){
		edges[j].style('label',edges[j].data('label'));
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
