import React, { Component } from "react";
import { solid, Square, split} from './square';
import { FileEditor } from "./FileEditor";
import { FilePicker } from "./FilePicker";
import { listFiles, loadFile, saveFile } from "./server";


/** Describes set of possible app page views. */
type Page = { kind: "picking", files: string[] } 
| { kind: "editing", name: string, sq: Square };

type AppState = {
  /** Stores state for the current page of the app to show. */
  show: Page;
  loading: boolean;
};


/**
 * Displays the square application containing either a list of files names
 * to pick from or an editor for files files
 */
export class App extends Component<{}, AppState> {

  constructor(props: {}) {
    super(props);

    this.state = { 
      show: { kind: "picking", files: [] },
       loading: false };
  }

  componentDidMount = (): void => {
    listFiles(this.doListResp);
  }

  render = (): JSX.Element => {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.show.kind === "picking") {
      return (
        <FilePicker
          onCreate={this.doLoadFileClick}
          fileNames={this.state.show.files}
        />
      );
    } else if (this.state.show.kind === "editing") {
      return (
        <FileEditor
          initialState={this.state.show.sq}
          fileName={this.state.show.name}
          onSave={(name, root) => this.doSaveFileClick(name, root)}
          onBack={() => this.doListFileClick()}
        />
      );
    } else {
      return <div>Unknown page state</div>
    }
  };

  doSaveFileClick = (name: string, root: Square): void => {
    saveFile(name, root, this.doHandelSaveResp);
  };

  doListFileClick = (): void => {
    listFiles(this.doListResp);
  };

  doListResp = (names: string[]): void => {
    this.setState({
      show: { kind: "picking", files: names }
    })
  };

  doHandelSaveResp = (name: string, saved: boolean): void => {
    if (saved) {
      console.log("Saved file successfully", name);
    } else {
      console.log("Failed to save this file", name);
    }
  };

  doLoadFileClick = (name: string): void => {
    loadFile(name, this.doLoadResp);
  };

  doLoadResp = (name: string, sq: Square | null): void => {
    const initialSquare: Square = split(
      solid("blue"),
      solid("orange"),
      solid("purple"),
      solid("red")
    );
    if (sq === null) {
      this.setState({
        show: { kind: "editing", name: name, sq: initialSquare }
      })
    } else {
      this.setState({
        show: { kind: "editing", name: name, sq: sq }
      })
    }
  };
  
}
