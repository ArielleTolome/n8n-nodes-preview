import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class PreviewNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Preview',
    name: 'previewNode',
    group: ['transform'],
    version: 1,
    description:
      'Passthrough node — displays inline image/video/JSON previews on the canvas. Connect it anywhere you want a visual checkpoint. Data flows through unchanged.',
    // Marker for injector.js to target this node type specifically
    // data-node-type="n8n-nodes-preview.previewNode"
    icon: 'file:preview.svg',
    defaults: {
      name: 'Preview',
      color: '#ff9800',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Label',
        name: 'label',
        type: 'string',
        default: '',
        placeholder: 'e.g. Generated image, API response…',
        description: 'Optional label shown on the canvas preview card',
      },
      {
        displayName: 'Preview Size',
        name: 'previewSize',
        type: 'options',
        options: [
          { name: 'Small (160px)', value: 'small' },
          { name: 'Medium (220px)', value: 'medium' },
          { name: 'Large (300px)', value: 'large' },
          { name: 'Full (fill node width)', value: 'full' },
        ],
        default: 'medium',
        description: 'Height of the preview card on the canvas',
      },
      {
        displayName: 'Show for Item Index',
        name: 'itemIndex',
        type: 'number',
        default: 0,
        description:
          'Which item to preview when multiple items flow through. Use -1 to show all items.',
      },
      {
        displayName: 'Pass Through Data',
        name: 'passThrough',
        type: 'boolean',
        default: true,
        description:
          'Whether to pass the input data unchanged to the next node. Disable to use this as a terminal preview step.',
      },
      {
        displayName: 'Max Items to Preview',
        name: 'maxItems',
        type: 'number',
        typeOptions: {
          minValue: 1,
          maxValue: 50,
        },
        default: 5,
        description: 'Maximum number of previews to show (1-50)',
      },
      {
        displayName: 'Show Filename',
        name: 'showFilename',
        type: 'boolean',
        default: true,
        description: 'Whether to show binary filename below each preview',
      },
      {
        displayName: 'Auto Expand on Canvas',
        name: 'autoExpand',
        type: 'boolean',
        default: true,
        description: 'Whether to automatically expand node on canvas when preview is ready',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const passThrough = this.getNodeParameter('passThrough', 0) as boolean;

    // Node is purely a visual passthrough — all logic is handled by injector.js
    // in the browser. We just return items unchanged (or empty if passThrough=false).
    if (!passThrough) {
      return [[]];
    }

    return [items];
  }
}
