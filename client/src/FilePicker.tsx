import React, { Component, ChangeEvent, MouseEvent } from "react";


type FilePickerProps = {
  // TODO: may want to add some props
  onCreate:(name:string)=>void;
  fileNames:string[];
};


type FilePickerState = {
  /** Text in the name text box. */
  name: string;
};


/** Displays the list of created design files. */
export class FilePicker extends Component<FilePickerProps, FilePickerState> {

  constructor(props: FilePickerProps) {
    super(props);

    this.state = {name: ''};
  }

  render = (): JSX.Element => {
    // TODO: format list of files as links
    return (<div>
        <h3>Files</h3>
        {this.renderItems()}
        <input
          type = "text"
          value = {this.state.name}
          onChange = {this.doNameChange}
          placeholder="Enter your design name"/>
          
          <button onClick = {this.doCreateClick}>Create</button>
      </div>);
  };

  renderItems = (): JSX.Element => {
    const items: JSX.Element[] = [];
    console.log("test");
    for (const fileName of this.props.fileNames) {
      const id = "file_" + fileName;
      items.push(
        <li key={id}>
          <a href="#" onClick={() => this.props.onCreate(fileName)}>
            {fileName}
          </a>
        </li>
      );
    }
  
    return <ul>{items}</ul>; // Wrap the items inside a <ul> element
  };
  

  // Updates our record with the file name text being typed in
  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    // TODO: remove this code, implement
    // console.log(evt);
    this.setState({name: evt.target.value});
  };

  // Updates the UI to show the file editor
  doCreateClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
    if (this.state.name.trim()) {
      this.props.onCreate(this.state.name);
    } else {
      alert("Please enter a valid file name");
    }
  };

}
