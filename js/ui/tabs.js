/**
 * tabs.js 
 */
;( function( window ) {
	
	'use strict';

	function Tabs( el, options ) {
		this.el = el;
		this.options = extend( {}, this.options );
  		extend( this.options, options );
  		this._init();
	}

	Tabs.prototype.options = {
		start : 0
	};

	Tabs.prototype._init = function() {
		// tabs elems
		this.tabs = [].slice.call( this.el.querySelectorAll( 'nav > ul > li' ) );
		// content items
		this.items = [].slice.call( this.el.querySelectorAll( '.ui_tabs-content > section' ) );
		// current index
		this.current = -1;
		// show current content item
		this._show();
		// init events
		this._initEvents();
	};

	Tabs.prototype._initEvents = function() {
		var self = this;
		this.tabs.forEach( function( tab, idx ) {
			tab.addEventListener( 'click', function( ev ) {
				ev.preventDefault();
				self._show( idx );
			} );
		} );
	};

	Tabs.prototype._show = function( idx ) {
		if( this.current >= 0 ) {
			removeClass(this.tabs[ this.current ], 'tab-current');
			removeClass(this.items[ this.current ], 'content-current');
		}
		// change current
		this.current = idx !== undefined ? idx : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
		addClass(this.tabs[ this.current ], 'tab-current');
		addClass(this.items[ this.current ], 'content-current');
		// this.tabs[ this.current ].className = 'tab-current';
		// this.items[ this.current ].className = 'content-current';
	};

	// add to global namespace
	window.Tabs = Tabs;

})( window );