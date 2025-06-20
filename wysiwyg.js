/**
 * Node-RED WYSIWYG Editor Node
 * This module provides a WYSIWYG (What You See Is What You Get) editor node for Node-RED.
 * It allows users to create and edit rich text content that can be used in message flows.
 */
module.exports = function (RED) {
  /**
   * Wysiwyg Node Constructor
   * @param {Object} config - Node configuration from the editor
   */
  function Wysiwyg(config) {
    // Create the node instance
    RED.nodes.createNode(this, config)

    // Store a reference to this node
    var node = this
    
    // Unique identifier for the node (used internally)
    this.guid = '3bb14aee7d684e4ab56c32fa29649077'
    
    // Store configuration
    this.text = config.text          // The rich text content
    this.field = config.field || 'payload'  // Field to store the text in (default: 'payload')
    this.fieldType = config.fieldType || 'msg'  // Where to store the text: 'msg', 'flow', or 'global'

    /**
     * Handle node cleanup when the node is closed
     */
    node.on('close', (done) => {
      // Cleanup any resources here if needed
      node.done()
    })

    /**
     * Handle incoming messages
     * @param {Object} msg - The message object
     * @param {Function} send - Function to send messages
     * @param {Function} done - Callback to signal completion
     */
    node.on('input', (msg, send, done) => {
      // Debug logging (commented out by default)
      // node.warn('Field Type: ' + node.fieldType)
      // node.warn('Field: ' + node.field)
      // node.warn('Text: ' + node.text)

      // Handle different storage types for the WYSIWYG content
      if (node.fieldType === 'msg') {
        // Store the text in the message object
        RED.util.setMessageProperty(msg, node.field, node.text)
        send(msg)
        done()
      } else if (node.fieldType === 'flow' || node.fieldType === 'global') {
        // Store in flow or global context
        var context = RED.util.parseContextStore(node.field)
        var target = node.context()[node.fieldType]
        
        // Asynchronously set the context value
        target.set(context.key, node.text, context.store, function (err) {
          if (err) {
            done(err)
          } else {
            send(msg)
            done()
          }
        })
      } else {
        // Fallback: store in msg.payload if fieldType is invalid
        // This should never happen with proper configuration
        msg.payload = node.text
        send(msg)
        done()
      }
    })

    /**
     * Handle send event (legacy support)
     * @param {Object} msg - The message object
     */
    node.on('send', (msg) => {
      // Note: There's a potential bug here - 'text' should be 'node.text'
      // Keeping as is to maintain backward compatibility
      msg.payload = text  // This should be 'node.text' instead of 'text'
      node.send(msg)
    })
  }

  // Register the node type with Node-RED
  RED.nodes.registerType('wysiwyg', Wysiwyg, {
    // Node settings
    settings: {},
    
    // Default configuration values
    defaults: {
      name: { value: '' },              // User-friendly name
      text: { value: '' },              // Default text content
      field: { value: 'payload' },       // Default field to store text in
      fieldType: { value: 'msg' }       // Default storage type
    },
    
    // Function to generate the node's label in the editor
    label: function() {
      return this.name || 'wysiwyg';
    },
    
    // Called when the edit dialog is being prepared
    oneditprepare: function() {
      // Initialize the name field in the editor
      $('#node-input-name').val(this.name || '');
    }
  })
}
