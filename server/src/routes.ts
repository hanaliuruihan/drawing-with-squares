import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check
/**Gloabal map to store file name and their corresponding JSON files */
export const fileMem: Map<string, unknown> = new Map<string, unknown>();


/**
 * Returns a greeting message if "name" is provided in query params
 * @param req request to respond to
 * @param res object to send response with
 */
export const dummy = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send('missing "name" parameter');
    return;
  }

  res.send({ greeting: `Hi, ${name}` });
};



const first = (param: unknown): string | undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};

/**
 * Retrieves the list of all file names currently stored in the `fileStore`.
 * 
 * @param _req - The incoming request object (not used in this method).
 * @param res - The response object used to send back the list of file names.
 */
export const names = (_req: SafeRequest, res: SafeResponse): void => {
  const fileNames = Array.from(fileMem.keys());
  res.send({names: fileNames});
};


/**
 * Saves a file with a given name and content to the `fileStore`.
 * 
 * @param req - The incoming request object containing the file name and content.
 * @param res - The response object used to send back the status of the save operation.
 */
export const save = (req: SafeRequest, res: SafeResponse): void => {
  const name = req.body.name;
  const contents = req.body.content;
  if (contents === undefined) {
    res.status(400).send('required argument "contents" was missing');
    return;
  } else if (name === undefined || typeof name !== 'string') {
    res.status(400).send('required argument "name" was missing');
    return;
  }
  fileMem.set(name, contents);
  console.log(name, contents);
  res.send({saved: true});
};

/**
 * Loads the content of a file with a given name from the `fileStore`.
 * 
 * @param req - The incoming request object containing the file name in the query parameters.
 * @param res - The response object used to send back the file's content or null if the file does not exist.
 */
export const load = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined||typeof name !== "string") {
    res.status(400).send('required argument "name" was missing');
    return;
  }
  if (fileMem.has(name)) {
    res.send({name: name, content: fileMem.get(name)});
  } else {
    res.send({name: name, content: null});
  };
}

/**
 * Clears all files from the `fileStore`.
 * This method is primarily intended for use in testing environments.
 */
export const forTesting = (): void => {
  fileMem.clear();
};