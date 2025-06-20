# Node-RED WYSIWYG Editor

[![Node-RED WYSIWYG Editor](https://img.shields.io/badge/Node--RED-WYSIWYG%20Editor-red)](https://flows.nodered.org/node/node-red-contrib-wysiwyg)

A WYSIWYG (What You See Is What You Get) editor node for Node-RED.

## Overview

This node allows you to create and edit rich text content directly within your Node-RED flows.

## Features

- Rich text editing capabilities
- Configurable output field and field type (msg, flow, or global context)
- Customizable node name for better flow organization
- Simple integration with existing Node-RED flows

## Installation

Run the following command in your Node-RED user directory (typically `~/.node-red`):

```bash
npm install node-red-contrib-wysiwyg
```

After installation, restart Node-RED to make the node available in your palette.

## Usage

1. Drag the WYSIWYG node from the palette to your flow
2. Double-click the node to open its configuration
3. Enter a name for the node (optional but recommended)
4. Configure the output settings:
   - **Field**: The property name to output to (default: 'payload')
   - **Field Type**: Where to store the output (msg, flow, or global context)
5. Click "Done" to save the configuration
6. Connect the node to other nodes in your flow as needed

## Configuration

### Node Properties

- **Name**: A friendly name for the node (appears under the node in the flow)
- **Text**: The rich text content to output
- **Field**: The property name to output to (default: 'payload')
- **Field Type**: Where to store the output:
  - `msg`: Output to message object (default)
  - `flow`: Store in flow context
  - `global`: Store in global context

## Example

A simple flow that uses the WYSIWYG node to set a welcome message:

```
[ WYSIWYG ] --> [ Debug ]
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[SEE LICENSE IN LICENSE.md](LICENSE.md)
