
		var 
		
		// Helper
		//$ = function(id){
		//	return document.getElementById(id);
		//},
		
		// Instance
		snapper = new Snap({
			//element: document.getElementById('content')
			element: $('#content')[0]
		}),
		
		// 
		UpdateDrawers = function(){
			var state = snapper.state(),
				towards = state.info.towards,
				opening = state.info.opening;
			if(opening=='right' && towards=='left'){
				$('#right-drawer').classList.add('active-drawer');
				$('#left-drawer').classList.remove('active-drawer');
			} else if(opening=='left' && towards=='right') {
				$('#right-drawer').classList.remove('active-drawer');
				$('#left-drawer').classList.add('active-drawer');
			}
		};
		
		snapper.on('#drag', UpdateDrawers);
		snapper.on('#animating', UpdateDrawers);
		snapper.on('#animated', UpdateDrawers);
		
		$('#toggle-left').bind('click', function(){
			snapper.open('left');
		});
		
		$('#toggle-right').bind('click', function(){
			snapper.open('right');
		});
		