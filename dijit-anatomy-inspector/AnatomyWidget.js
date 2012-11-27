// http://dojotoolkit.org/reference-guide/1.8/dijit/_WidgetBase.html

define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/AnatomyWidget.html"
], function (
    declare,
    _WidgetBase,
    _TemplatedMixin,
    template
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        
        templateString: template,
        
        // Setters are called for all attributes with custom setters
        // and that were either specified as constructor parameters
        // or have non-null non-blank non-zero default values
        title: 'Initial value set in the widget',
        xxx: 'Another class property with custom setter',
        
        // custom setter, invoked on myWidget.set("title", "value")
        _setTitleAttr: function (value) {
            console.info('_setTitleAttr("' + value + '")');
            this.titleNode.innerHTML = value;
            // always use _set to update internal values to interface properly
            // with the watch functionality from dojo/Stateful
            this._set("title", value);
        },
        
        _setXxxAttr: function (value) {
            console.info('_setXxxAttr("' + value + '")');
            // always use _set to update internal values to interface properly
            // with the watch functionality from dojo/Stateful
            this._set("xxx", value);
        },

        // custom getter, invoked on myWidget.get("title")
        _getTitleAttr: function () {
            console.log('_getTitleAttr()');
        },
        
        // event handler defined in template by data-dojo-attach-event="onclick:_onTitleClick"
        _onTitleClick: function () {
            alert('You clicked the title');
        },

        preamble: function () {
            console.log('preamble() called by dojo/_base/declare');
            this.inherited(arguments);
        },

        constructor: function (params, srcNodeRef) {
            console.log('constructor() called by dojo/_base/declare');
            // by default, parent constructors are always called,
            // but this behaviour can be modified by means of the "-chains-" property
        },
        
        postscript: function (params, srcNodeRef) {
            console.log('postscript() called by dojo/_base/declare');
            this.inherited(arguments);
        },

        create: function (params, srcNodeRef) {
            console.info('create() called by this.postscript() kicking off the widget life-cycle');
            this.inherited(arguments);
        },
        
        // Invoked before rendering occurs, and before any dom nodes are created.
        // Change the instance’s properties here before the widget is rendered
        postMixInProperties: function () {
            console.log('postMixInProperties() called by this.create()');
            console.info('this.yyy is now available', this.yyy);
            this.inherited(arguments);
        },
        
        // Overwrite here to use different templating system
        buildRendering: function () {
            console.log('buildRendering() called by create()');
            this.inherited(arguments);
        },
        
        _beforeFillContent: function () {
            console.log('_beforeFillContent() called by buildRendering()');
            this.inherited(arguments);
        },
        
        _fillContent: function (srcNodeRef) {
            console.log('_fillContent() called by buildRendering()');
            this.inherited(arguments);
        },

        // Most important method to keep in mind when creating widgets
        // Do processing after the DOM fragment is created
        // Do not include any operations which rely on node dimensions or placement
        postCreate: function () {
            console.log('postCreate() called by create()');
            this.inherited(arguments);
        },

        // Do processing after the DOM fragment is added to the document
        // Called after the widget and its children have been created and added to the page
        // When instantiating a widget programmatically, always call startup() method after placing it in the document
        startup: function () {
            console.log('startup() called by dojo/parser or manually when initializing programmatically');
            this.inherited(arguments);
        },

        // Advisable to call when explicitly destroying a widget
        destroyRecursive: function () {
            console.log('destroyRecursive() called manually');
            this.inherited(arguments);
        },

        destroyDescendants: function () {
            console.log('destroyDescendants() called by this.destroyRecursive');
            this.inherited(arguments);
        },

        // Necessary custom tear-down behavior should be defined here
        destroy: function () {
            console.log('destroy() called by this.destroyRecursive');
            this.inherited(arguments);
        },

        destroyRendering: function () {
            console.log('destroyRendering() called by this.destroy');
            this.inherited(arguments);
        },
        
        logProperties: function () {
            console.log('*** PROPERTIES ***');
            // reference to the overall parent node of the widget itself
            console.log('domNode: ', this.domNode);
            // the original DOM node that existed before it was "widgetified", if one was provided
            console.log('srcNodeRef: ', this.srcNodeRef);
            // If the template defines data-dojo-attach-point=”containerNode”, the children from the srcNodeRef will be copied to this node
            console.log('containerNode: ', this.containerNode);
            // the template
            console.log('templateString: ', this.templateString);
            // a unique string identifying the widget
            console.log('id: ', this.id);
            // a rarely-used string that can override the default Dojo locale
            console.log('lang: ', this.lang);
            // useful for bi-directional support
            console.log('dir: ', this.dir);
            // the HTML class attribute for the widget's domNode
            console.log('class: ', this['class']);
            // the HTML style attribute for the widget's domNode
            console.log('style: ', this.style);
            // most commonly, the HTML title attribute for native tooltips
            console.log('title: ', this.title);
            // some other property
            console.log('xxx: ', this.xxx);
            // the root CSS class of the widget
            console.log('baseClass: ', this.baseClass);
            console.log('*** PROPERTIES ***');
        }
    });
});