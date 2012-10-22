define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/dom-style",
    "dojo/dom-geometry",
    "dojo/_base/lang",
    "dojo/_base/window",
    "dojo/window",
    "dojo/on",
    "dojo/text!./templates/InfoWidget.html"
], function (
    declare,
    _WidgetBase,
    _TemplatedMixin,
    domStyle,
    geometry,
    lang,
    baseWin,
    win,
    on,
    template
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        
        templateString: template,
        scrollNode: null,
        contentNode: null,
        offsetNodes: null,
        
        postCreate: function () {
            this.inherited(arguments);
            
            var analyze = function () {
                domStyle.set(this.domNode, 'top', geometry.docScroll().y + 100 + 'px');
                
                // #content dimension
                this.scrollWH.innerHTML = this.contentNode.scrollWidth + ' / ' + this.contentNode.scrollHeight;
                this.positionWH.innerHTML = geometry.position(this.contentNode).w + ' / ' + geometry.position(this.contentNode).h;
                
                // #content dimension
                this.positionRelToViewportXH.innerHTML = geometry.position(this.contentNode, false).x + ' / ' + geometry.position(this.contentNode, false).y;
                this.positionRelToDocumentXH.innerHTML = geometry.position(this.contentNode, true).x + ' / ' + geometry.position(this.contentNode, true).y;
                
                // window dimension
                this.winWH.innerHTML = win.getBox().w + ' x ' + win.getBox().h;
                this.windowInnerWH.innerHTML = window.innerWidth + ' x ' + window.innerHeight;
                
                // window scroll
                this.pageOffsetXY.innerHTML = window.pageXOffset + ' / ' + window.pageYOffset;
                this.docScrollXY.innerHTML = geometry.docScroll().x + ' / ' + geometry.docScroll().y;
                
                // screen
                this.screenWH.innerHTML = screen.width + ' x ' + screen.height;
                
                this.offsetNodes.forEach(function (node) {
                    node.innerHTML = 'rel to doc: ' + geometry.position(node, true).y + ', rel to viewport: ' + geometry.position(node, false).y;
                });
            }
            
            lang.hitch(this, analyze)();
            
            this.own(on(this.scrollNode, 'scroll', lang.hitch(this, function (ev) {
                lang.hitch(this, analyze)();
            })));
        }
    });
});