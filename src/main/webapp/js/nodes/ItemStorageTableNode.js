var ItemStorageTableNode = function(rows, cols) {
	mixin(new StackPanelNode(), this);
	
	this.rows = rows;
	this.cols = cols;
	
	this.renderSettings.graphicsType = GraphicsType.RECT;
	this.renderSettings.color = "#d0d0d0";
	this.renderSettings.sizing = {width: Sizing.CHILDREN, height: Sizing.CHILDREN};
	this.orientation = Orientation.VERTICAL;
	
	this.itemStorageNodes = new Array(rows);
	
	for(var row = 0; row < rows; row++) {
		var rowNode = new StackPanelNode();
		rowNode.orientation = Orientation.HORIZONTAL;
		rowNode.renderSettings.sizing = {width: Sizing.CHILDREN, height: Sizing.CHILDREN};
		this.addChild(rowNode);
		this.itemStorageNodes[row] = new Array(cols);
		
		for(var col = 0; col < cols; col++) {
			var itemStorageNode = new ItemStorageNode();
			rowNode.addChild(itemStorageNode);
			this.itemStorageNodes[row][col] = itemStorageNode;
		}
	}
};

ItemStorageTableNode.prototype.clear = function() {
	for(var row = 0; row < this.rows; row++) {
		for(var col = 0; col < this.cols; col++) {
			this.itemStorageNodes[row][col].clear();
		}
	}
};

ItemStorageTableNode.prototype.setStorage = function(storages) {
	var self = this;
	self.clear();
	$.each(storages, function(index, storage) {
		var row = index % self.rows;
		var col = Math.floor(index / self.rows);
		if(row > self.rows || col > self.cols) {
			Error.setMessage("<h2>Ooops!</h2><br/>An ItemStorageTableNode received more item storages than it has slots to display them in.");
			Error.show();
		};
		self.itemStorageNodes[row][col].setItemStorage(storage);
	});
};