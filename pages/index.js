import Head from 'next/head';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function IndexPage() {
  const createNode = (name, parentId) => {
    let id = crypto.randomUUID();
    return {
      name: name,
      id: id,
      parentId: parentId == null ? id : parentId,
      content: '',
      className: '',
      children: [],
      style: (() => {
        let s = {};
        let properties = [
          'margin-left',
          'margin-right',
          'margin-top',
          'margin-bottom',
          'padding-left',
          'padding-right',
          'padding-top',
          'padding-bottom',
          'display',
          'float',
          'z-index',
          'text-align',
          'font-style',
          'font-family',
          'font-size',
          'font-weight',
          'background-color',
          'color',
          'position',
          'left',
          'top',
          'width',
          'height',
          'min-width',
          'min-height',
          'max-width',
          'max-height',
          'text-decoration-line',
          'text-decoration-style',
          'text-decoration-thickness',
          'border-style',
          'border-width',
          'border-radius',
          'border-color',
        ];
        for (const p of properties) {
          s[p] = '';
        }
        return s;
      })(),
    };
  };

  const [dom, setDom] = useState([createNode('root', null)]);
  const [html, setHTML] = useState('');
  const [selectedId, setSelectedId] = useState(dom[0].id);
  const [element, setElement] = useState('h1');
  const [content, setContent] = useState('');

  const [display, setDisplay] = useState('');
  const [position, setPosition] = useState('');
  const [left, setLeft] = useState('');
  const [top, setTop] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [minWidth, setMinWidth] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [maxWidth, setMaxWidth] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [margin, setMargin] = useState('');
  const [marginLeft, setMarginLeft] = useState('');
  const [marginRight, setMarginRight] = useState('');
  const [marginTop, setMarginTop] = useState('');
  const [marginBottom, setMarginBottom] = useState('');
  const [padding, setPadding] = useState('');
  const [paddingLeft, setPaddingLeft] = useState('');
  const [paddingRight, setPaddingRight] = useState('');
  const [paddingTop, setPaddingTop] = useState('');
  const [paddingBottom, setPaddingBottom] = useState('');
  const [float, setFloat] = useState('');
  const [zIndex, setZIndex] = useState('');

  const [alignment, setAlignment] = useState('');
  const [fontStyle, setFontStyle] = useState('');
  const [fontFamily, setFontFamily] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [fontWeight, setFontWeight] = useState('');
  const [textDecorationLine, setTextDecorationLine] = useState('');
  const [textDecorationStyle, setTextDecorationStyle] = useState('');
  const [textDecorationThickness, setTextDecorationThickness] = useState('');

  const [backgroundColor, setBackgroundColor] = useState('');
  const [foregroundColor, setForegroundColor] = useState('');
  const [borderColor, setBorderColor] = useState('');

  const [borderStyle, setBorderStyle] = useState('');
  const [borderWidth, setBorderWidth] = useState('');
  const [borderRadius, setBorderRadius] = useState('');

  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [expanded, setExpanded] = useState(false);
  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const renderTree = (nodes) => {
    return (
      <TreeItem nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };
  const findNode = (nodes, id) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        return nodes[i];
      } else if (nodes[i].children.length > 0) {
        let node = findNode(nodes[i].children, id);
        if (node != null) {
          return node;
        }
      }
    }
    return null;
  };
  const getHTML = (nodes) => {
    let text = '';
    for (const node of nodes) {
      let content;
      if (node.children.length > 0) {
        content = getHTML(node.children);
      } else {
        content = node.content;
      }
      let styleText = '';
      for (const property of Object.keys(node.style)) {
        if (node.style[property] !== '') {
          styleText += property + ': ' + node.style[property] + ';';
        }
      }
      text +=
        '<' +
        node.name +
        ' style="' +
        styleText +
        '"' +
        '>' +
        content +
        '</' +
        node.name +
        '>';
    }
    return text;
  };
  const updateDom = (newDom) => {
    setDom(newDom);
    setHTML(getHTML(newDom));
  };
  const updateStyle = (property, value) => {
    let newDom = JSON.parse(JSON.stringify(dom));
    findNode(newDom, selectedId).style[property] = value;
    updateDom(newDom);
  };
  const updateStyles = (properties, value) => {
    let newDom = JSON.parse(JSON.stringify(dom));
    for (const property of properties) {
      findNode(newDom, selectedId).style[property] = value;
    }
    updateDom(newDom);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={7} style={{ maxHeight: '95vh', overflow: 'scroll' }}>
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </Grid>

        <Grid item xs={3} style={{ maxHeight: '95vh', overflow: 'scroll' }}>
          <ButtonGroup variant="outlined" fullWidth>
            <Button onClick={() => setImportDialogOpen(true)}>Import</Button>
            <Button onClick={() => setExportDialogOpen(true)}>Export</Button>
            <Button>Reset</Button>
          </ButtonGroup>
          <br />
          <br />
          <Accordion
            expanded={expanded === 'dom'}
            onChange={handleExpand('dom')}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              DOM
            </AccordionSummary>
            <AccordionDetails>
              <Select
                value={element}
                fullWidth
                onChange={(e) => setElement(e.target.value)}
              >
                <MenuItem value="h1">Heading</MenuItem>
                <MenuItem value="h2">Sub-Heading</MenuItem>
                <MenuItem value="h3">Sub-Sub-Heading</MenuItem>
                <MenuItem value="p">Paragraph</MenuItem>
                <MenuItem value="a">Link</MenuItem>
                <MenuItem value="img">Image</MenuItem>
                <MenuItem value="hr">Divider Line</MenuItem>
                <MenuItem value="ol">Ordered List</MenuItem>
                <MenuItem value="ul">Unordered List</MenuItem>
                <MenuItem value="li">List Item</MenuItem>
                <MenuItem value="table">Table</MenuItem>
                <MenuItem value="thead">Table Head</MenuItem>
                <MenuItem value="tbody">Table Body</MenuItem>
                <MenuItem value="tr">Table Row</MenuItem>
                <MenuItem value="td">Table Cell</MenuItem>
                <MenuItem value="br">Line Break</MenuItem>
                <MenuItem value="div">Container</MenuItem>
              </Select>
              <br />
              <br />
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => {
                  if (selectedId == null) {
                    return;
                  }
                  let newDom = JSON.parse(JSON.stringify(dom));
                  findNode(newDom, selectedId).children.push(
                    createNode(element, selectedId)
                  );
                  updateDom(newDom);
                }}
              >
                <AddIcon />
              </Button>
              <br />
              <br />
              <ButtonGroup fullWidth>
                <Button
                  onClick={(e) => {
                    let newDom = JSON.parse(JSON.stringify(dom));
                    const parent = findNode(
                      newDom,
                      findNode(newDom, selectedId).parentId
                    );
                    const index = parent.children.findIndex(
                      (node) => node.id === selectedId
                    );
                    if (index <= 0) {
                      return;
                    }
                    [parent.children[index], parent.children[index - 1]] = [
                      parent.children[index - 1],
                      parent.children[index],
                    ];
                    updateDom(newDom);
                  }}
                >
                  Move Up
                </Button>
                <Button
                  onClick={(e) => {
                    let newDom = JSON.parse(JSON.stringify(dom));
                    const parent = findNode(
                      newDom,
                      findNode(newDom, selectedId).parentId
                    );
                    const index = parent.children.findIndex(
                      (node) => node.id === selectedId
                    );
                    if (index == parent.children.length - 1) {
                      return;
                    }
                    [parent.children[index], parent.children[index + 1]] = [
                      parent.children[index + 1],
                      parent.children[index],
                    ];
                    updateDom(newDom);
                  }}
                >
                  Move Down
                </Button>
              </ButtonGroup>
              <ButtonGroup fullWidth>
                <Button
                  onClick={(e) => {
                    let newDom = JSON.parse(JSON.stringify(dom));
                    const parent = findNode(
                      newDom,
                      findNode(newDom, selectedId).parentId
                    );
                    const index = parent.children.findIndex(
                      (node) => node.id === selectedId
                    );
                    if (parent.name === 'root') {
                      return;
                    }
                    const parentOfParent = findNode(newDom, parent.parentId);
                    let newNode = JSON.parse(
                      JSON.stringify(parent.children[index])
                    );
                    newNode.parentId = parentOfParent.id;
                    parentOfParent.children.push(newNode);
                    parent.children.splice(index, 1);
                    updateDom(newDom);
                  }}
                >
                  Move Out
                </Button>
                <Button
                  onClick={(e) => {
                    let newDom = JSON.parse(JSON.stringify(dom));
                    const parent = findNode(
                      newDom,
                      findNode(newDom, selectedId).parentId
                    );
                    const index = parent.children.findIndex(
                      (node) => node.id === selectedId
                    );
                    if (index == parent.children.length - 1) {
                      return;
                    }
                    let newNode = JSON.parse(
                      JSON.stringify(parent.children[index])
                    );
                    newNode.parentId = parent.children[index + 1].id;
                    parent.children[index + 1].children.push(newNode);
                    parent.children.splice(index, 1);
                    updateDom(newDom);
                  }}
                >
                  Move In
                </Button>
              </ButtonGroup>
              <br />
              <br />
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  if (selectedId === dom[0].id) {
                    return;
                  }
                  let newDom = JSON.parse(JSON.stringify(dom));
                  let parent = findNode(
                    newDom,
                    findNode(newDom, selectedId).parentId
                  );
                  parent.children = parent.children.filter(
                    (node) => node.id != selectedId
                  );
                  setSelectedId(dom[0].id);
                  updateDom(newDom);
                }}
              >
                <DeleteIcon />
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'edit'}
            onChange={handleExpand('edit')}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Edit
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="content"
                value={content}
                multiline
                fullWidth
                onChange={(e) => {
                  setContent(e.target.value);
                  let newDom = JSON.parse(JSON.stringify(dom));
                  findNode(newDom, selectedId).content = e.target.value;
                  updateDom(newDom);
                }}
              />
              <br />
              <br />
              <TextField label="url" variant="filled" fullWidth disabled />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'layout'}
            onChange={handleExpand('layout')}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Layout
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Display:</Typography>
              <br />
              <Select
                value={display}
                fullWidth
                onChange={(e) => {
                  setDisplay(e.target.value);
                  updateStyle('display', e.target.value);
                }}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="inline">Inline</MenuItem>
                <MenuItem value="block">Block</MenuItem>
                <MenuItem value="inline-block">Inline Block</MenuItem>
              </Select>
              <br />
              <br />
              <Typography>Position: </Typography>
              <br />
              <Select
                value={position}
                fullWidth
                onChange={(e) => {
                  setPosition(e.target.value);
                  updateStyle('position', e.target.value);
                }}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="static">Static</MenuItem>
                <MenuItem value="relative">Relative</MenuItem>
                <MenuItem value="absolute">Absolute</MenuItem>
                <MenuItem value="fixed">Fixed</MenuItem>
                <MenuItem value="sticky">Sticky</MenuItem>
              </Select>
              <br />
              <br />
              <TextField
                label="left"
                variant="filled"
                fullWidth
                value={left}
                onChange={(e) => {
                  setLeft(e.target.value);
                  updateStyle('left', e.target.value);
                }}
              />
              <TextField
                label="top"
                variant="filled"
                fullWidth
                value={top}
                onChange={(e) => {
                  setTop(e.target.value);
                  updateStyle('top', e.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                label="width"
                variant="filled"
                fullWidth
                value={width}
                onChange={(e) => {
                  setWidth(e.target.value);
                  updateStyle('width', e.target.value);
                }}
              />
              <TextField
                label="height"
                variant="filled"
                fullWidth
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  updateStyle('height', e.target.value);
                }}
              />
              <TextField
                label="minimum width"
                variant="filled"
                fullWidth
                value={minWidth}
                onChange={(e) => {
                  setMinWidth(e.target.value);
                  updateStyle('min-width', e.target.value);
                }}
              />
              <TextField
                label="minimum height"
                variant="filled"
                fullWidth
                value={minHeight}
                onChange={(e) => {
                  setMinHeight(e.target.value);
                  updateStyle('min-height', e.target.value);
                }}
              />
              <TextField
                label="maximum width"
                variant="filled"
                fullWidth
                value={maxWidth}
                onChange={(e) => {
                  setMaxWidth(e.target.value);
                  updateStyle('max-width', e.target.value);
                }}
              />
              <TextField
                label="maximum height"
                variant="filled"
                fullWidth
                value={maxHeight}
                onChange={(e) => {
                  setMaxHeight(e.target.value);
                  updateStyle('max-height', e.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                label="margin"
                variant="filled"
                fullWidth
                value={margin}
                onChange={(e) => {
                  setMargin(e.target.value);
                  setMarginLeft(e.target.value);
                  setMarginRight(e.target.value);
                  setMarginTop(e.target.value);
                  setMarginBottom(e.target.value);
                  updateStyles(
                    [
                      'margin-left',
                      'margin-right',
                      'margin-top',
                      'margin-bottom',
                    ],
                    e.target.value
                  );
                }}
              />
              <TextField
                label="margin left"
                variant="filled"
                fullWidth
                value={marginLeft}
                onChange={(e) => {
                  setMargin('');
                  setMarginLeft(e.target.value);
                  updateStyle('margin-left', e.target.value);
                }}
              />
              <TextField
                label="margin right"
                variant="filled"
                fullWidth
                value={marginRight}
                onChange={(e) => {
                  setMargin('');
                  setMarginRight(e.target.value);
                  updateStyle('margin-right', e.target.value);
                }}
              />
              <TextField
                label="margin top"
                variant="filled"
                fullWidth
                value={marginTop}
                onChange={(e) => {
                  setMargin('');
                  setMarginTop(e.target.value);
                  updateStyle('margin-top', e.target.value);
                }}
              />
              <TextField
                label="margin bottom"
                variant="filled"
                fullWidth
                value={marginBottom}
                onChange={(e) => {
                  setMarginBottom(e.target.value);
                  updateStyle('margin-bottom', e.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                label="padding"
                variant="filled"
                fullWidth
                value={padding}
                onChange={(e) => {
                  setPadding(e.target.value);
                  setPaddingLeft(e.target.value);
                  setPaddingRight(e.target.value);
                  setPaddingTop(e.target.value);
                  setPaddingBottom(e.target.value);
                  updateStyles(
                    [
                      'padding-left',
                      'padding-right',
                      'padding-top',
                      'padding-bottom',
                    ],
                    e.target.value
                  );
                }}
              />
              <TextField
                label="padding left"
                variant="filled"
                fullWidth
                value={paddingLeft}
                onChange={(e) => {
                  setPadding('');
                  setPaddingLeft(e.target.value);
                  updateStyle('padding-left', e.target.value);
                }}
              />
              <TextField
                label="padding right"
                variant="filled"
                fullWidth
                value={paddingRight}
                onChange={(e) => {
                  setPadding('');
                  setPaddingRight(e.target.value);
                  updateStyle('padding-right', e.target.value);
                }}
              />
              <TextField
                label="padding top"
                variant="filled"
                fullWidth
                value={paddingTop}
                onChange={(e) => {
                  setPadding('');
                  setPaddingTop(e.target.value);
                  updateStyle('padding-top', e.target.value);
                }}
              />
              <TextField
                label="padding bottom"
                variant="filled"
                fullWidth
                value={paddingBottom}
                onChange={(e) => {
                  setPadding('');
                  setPaddingBottom(e.target.value);
                  updateStyle('padding-bottom', e.target.value);
                }}
              />
              <br />
              <br />
              <Typography>Float: </Typography>
              <br />
              <Select
                value={float}
                fullWidth
                onChange={(e) => {
                  setFloat(e.target.value);
                  updateStyle('float', e.target.value);
                }}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="left">Left</MenuItem>
                <MenuItem value="right">Right</MenuItem>
              </Select>
              <br />
              <br />
              <TextField
                label="z-index"
                variant="filled"
                fullWidth
                value={zIndex}
                onChange={(e) => {
                  setZIndex(e.target.value);
                  updateStyle('z-index', e.target.value);
                }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'text'}
            onChange={handleExpand('text')}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Text
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Alignment: </Typography>
              <br />
              <Select
                value=""
                fullWidth
                value={alignment}
                onChange={(e) => {
                  setAlignment(e.target.value);
                  updateStyle('text-align', e.target.value);
                }}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="left">Left</MenuItem>
                <MenuItem value="center">Center</MenuItem>
                <MenuItem value="right">Right</MenuItem>
                <MenuItem value="justify">Justify</MenuItem>
              </Select>
              <br />
              <br />
              <Typography>Font style: </Typography>
              <br />
              <Select
                value=""
                fullWidth
                value={fontStyle}
                onChange={(e) => {
                  setFontStyle(e.target.value);
                  updateStyle('font-style', e.target.value);
                }}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="italic">Italic</MenuItem>
                <MenuItem value="oblique">Oblique</MenuItem>
              </Select>
              <br />
              <br />
              <TextField
                label="font family"
                variant="filled"
                fullWidth
                value={fontFamily}
                onChange={(e) => {
                  setFontFamily(e.target.value);
                  updateStyle('font-family', e.target.value);
                }}
              />
              <TextField
                label="font size"
                variant="filled"
                fullWidth
                value={fontSize}
                onChange={(e) => {
                  setFontSize(e.target.value);
                  updateStyle('font-size', e.target.value);
                }}
              />
              <TextField
                label="font weight"
                variant="filled"
                fullWidth
                value={fontWeight}
                onChange={(e) => {
                  setFontWeight(e.target.value);
                  updateStyle('font-weight', e.target.value);
                }}
              />
              <br />
              <br />
              <Typography>Text decoration line: </Typography>
              <br />
              <Select
                fullWidth
                value={textDecorationLine}
                onChange={(e) => {
                  setTextDecorationLine(e.target.value);
                  updateStyle('text-decoration-line', e.target.value);
                }}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="underline">Underline</MenuItem>
                <MenuItem value="overline">Overline</MenuItem>
                <MenuItem value="line-through">Line-Through</MenuItem>
              </Select>
              <br />
              <br />
              <Typography>Text decoration style: </Typography>
              <br />
              <Select
                value={textDecorationStyle}
                fullWidth
                onChange={(e) => {
                  setTextDecorationStyle(e.target.value);
                  updateStyle('text-decoration-style', e.target.value);
                }}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="solid">Solid</MenuItem>
                <MenuItem value="double">Double</MenuItem>
                <MenuItem value="dashed">Dashed</MenuItem>
                <MenuItem value="wavy">Wavy</MenuItem>
              </Select>
              <br />
              <br />
              <TextField
                label="text decoration thickness"
                fullWidth
                value={textDecorationThickness}
                onChange={(e) => {
                  setTextDecorationThickness(e.target.value);
                  updateStyle('text-decoration-thickness', e.target.value);
                }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'color'}
            onChange={handleExpand('color')}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Color
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="background color"
                variant="filled"
                fullWidth
                value={backgroundColor}
                onChange={(e) => {
                  setBackgroundColor(e.target.value);
                  updateStyle('background-color', e.target.value);
                }}
              />
              <TextField
                label="foreground color"
                variant="filled"
                fullWidth
                value={foregroundColor}
                onChange={(e) => {
                  setForegroundColor(e.target.value);
                  updateStyle('color', e.target.value);
                }}
              />
              <TextField
                label="border color"
                variant="filled"
                fullWidth
                value={borderColor}
                onChange={(e) => {
                  setBorderColor(e.target.value);
                  updateStyle('border-color', e.target.value);
                }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'border'}
            onChange={handleExpand('border')}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Border
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Border Style: </Typography>
              <br />
              <Select
                value={borderStyle}
                fullWidth
                onChange={(e) => {
                  setBorderStyle(e.target.value);
                  updateStyle('border-style', e.target.value);
                }}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="solid">Solid</MenuItem>
                <MenuItem value="dotted">Dotted</MenuItem>
                <MenuItem value="dashed">Dashed</MenuItem>
                <MenuItem value="double">Double</MenuItem>
                <MenuItem value="groove">Groove</MenuItem>
                <MenuItem value="ridge">Ridge</MenuItem>
                <MenuItem value="inset">Inset</MenuItem>
                <MenuItem value="outset">Outset</MenuItem>
              </Select>
              <br />
              <br />
              <TextField
                label="border width"
                variant="filled"
                fullWidth
                value={borderWidth}
                onChange={(e) => {
                  setBorderWidth(e.target.value);
                  updateStyle('border-width', e.target.value);
                }}
              />
              <TextField
                label="border radius"
                variant="filled"
                fullWidth
                value={borderRadius}
                onChange={(e) => {
                  setBorderRadius(e.target.value);
                  updateStyle('border-radius', e.target.value);
                }}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={2} style={{ maxHeight: '95vh', overflow: 'scroll' }}>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            selected={selectedId}
            onNodeSelect={(e, selected) => {
              setSelectedId(selected);
              const node = findNode(dom, selected);
              setContent(node.content);
              setDisplay(node.style['display']);
              setPosition(node.style['position']);
              setLeft(node.style['left']);
              setTop(node.style['top']);
              setWidth(node.style['width']);
              setHeight(node.style['height']);
              setMinWidth(node.style['min-width']);
              setMinHeight(node.style['min-height']);
              setMaxWidth(node.style['max-width']);
              setMaxHeight(node.style['max-height']);
              setMargin('');
              setMarginLeft(node.style['margin-left']);
              setMarginRight(node.style['margin-right']);
              setMarginTop(node.style['margin-top']);
              setMarginBottom(node.style['margin-bottom']);
              setPadding('');
              setPaddingLeft(node.style['padding-left']);
              setPaddingRight(node.style['padding-right']);
              setPaddingTop(node.style['padding-top']);
              setPaddingBottom(node.style['padding-bottom']);
              setFloat(node.style['float']);
              setZIndex(node.style['z-index']);
              setAlignment(node.style['text-align']);
              setFontStyle(node.style['font-style']);
              setFontFamily(node.style['font-family']);
              setFontSize(node.style['font-size']);
              setFontWeight(node.style['font-weight']);
              setTextDecorationLine(node.style['text-decoration-line']);
              setTextDecorationStyle(node.style['text-deocration-style']);
              setTextDecorationThickness(
                node.style['text-deocration-thickness']
              );
              setBackgroundColor(node.style['background-color']);
              setForegroundColor(node.style['color']);
              setBorderColor(node.style['border-color']);
              setBorderStyle(node.style['border-style']);
              setBorderWidth(node.style['border-width']);
              setBorderRadius(node.style['border-radius']);
            }}
          >
            {renderTree(dom[0])}
          </TreeView>
        </Grid>
      </Grid>
      <Dialog
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
      >
        <DialogTitle>Export</DialogTitle>
        <DialogContent>
          <Typography>JSON:</Typography>
          <TextField value={JSON.stringify(dom)}></TextField>
          <Typography>HTML:</Typography>
          <TextField
            value={
              '<!DOCTYPE html><html><body>' +
              getHTML(dom[0].children) +
              '</body></html>'
            }
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
      >
        <DialogTitle>Import</DialogTitle>
        <DialogContent>
          <Typography>JSON: </Typography>
          <TextField
            onChange={(e) => setImportText(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              let newDom = JSON.parse(importText);
              updateDom(newDom);
              setImportDialogOpen(false);
            }}
          >
            Import
          </Button>
          <Button onClick={() => setImportDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
