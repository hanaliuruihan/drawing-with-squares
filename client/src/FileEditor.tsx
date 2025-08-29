import React, { Component, ChangeEvent, MouseEvent } from "react";
import { Square, Path, findRoot, split, replace, solid, toColor} from './square';
import { SquareElem } from "./square_draw";
import {equal, prefix, len} from "./list"


type FileEditorProps = {
  /** Initial state of the file. */
  initialState: Square;

  /** Called to ask parent to save file contents in server. */
  onSave: (name: string, root: Square) => void;

  fileName:string;
  onBack: () => void;
  // TODO: may want to add more props
};


type FileEditorState = {
  /** The root square of all squares in the design. */
  root: Square;

  /** Path to the square that is currently clicked on, if any. */
  selected?: Path;
};


/** UI for editing square design page. */
export class FileEditor extends Component<FileEditorProps, FileEditorState> {

  constructor(props: FileEditorProps) {
    super(props);
    this.state = { root: props.initialState };
  }

  render = (): JSX.Element => {
    // TODO: add some editing tools here
    return( 
      <div>
        <button type = "button" onClick = {this.doMergeClick}>merge</button>
        <button type = "button" onClick = {this.doSplitClick}>split</button>
        <button onClick={this.doSaveClick}>Save</button>
        <button onClick={this.props.onBack}>Back</button>
        <select value = "select" onChange = {this.doColorChange}>
          <option value = "red">Red</option>
          <option value = "orange">Orange</option>
          <option value = "yellow">Yellow</option>
          <option value = "green">Green</option>
          <option value = "blue">Blue</option>
          <option value = "purple">Purple</option>
          <option value = "white">White</option>
        </select>
                    <SquareElem width={600n} height={600n}
                      square={this.state.root} selected={this.state.selected}
                      onClick={this.doSquareClick}></SquareElem>
       </div>                
    );

  };

  doSquareClick = (path: Path): void => {
    // TODO: remove this code, do something with the path to the selected square
    // console.log(path);
    // alert("Stop that!");
    if (this.state.selected&&equal(this.state.selected, path)){
      this.setState({selected:undefined});
    } else {
      this.setState({selected:path});
    }
  }

  doSplitClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
    if (!(this.state.selected === undefined)){
      const s = findRoot(this.state.root, this.state.selected);
      const s1 = split(s, s, s, s);
      const splitS = replace(this.state.root, this.state.selected, s1);
      this.setState({root:splitS, selected:undefined});
    }
  };

  doMergeClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
    if (!(this.state.selected === undefined)){
      const s = findRoot(this.state.root, this.state.selected);
      const r = prefix(len(this.state.selected)-1n, this.state.selected);
      const update = replace(this.state.root, r, s);
      this.setState({root:update, selected:undefined})
    }
  };

  doColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    // TODO: remove this code, implement
    //console.log(evt);
    const s: Square = solid(toColor(evt.target.value));
    if (!(this.state.selected === undefined)){
      this.setState({root:replace(this.state.root, this.state.selected, s), selected:undefined});
    }
  };

  doSaveClick = (_evt:MouseEvent<HTMLButtonElement>):void =>{
    this.props.onSave(this.props.fileName, this.state.root);
  }
}
