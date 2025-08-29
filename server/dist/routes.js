"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forTesting = exports.load = exports.save = exports.names = exports.dummy = exports.fileMem = void 0;
/**Gloabal map to store file name and their corresponding JSON files */
exports.fileMem = new Map();
/**
 * Returns a greeting message if "name" is provided in query params
 * @param req request to respond to
 * @param res object to send response with
 */
const dummy = (req, res) => {
    const name = first(req.query.name);
    if (name === undefined) {
        res.status(400).send('missing "name" parameter');
        return;
    }
    res.send({ greeting: `Hi, ${name}` });
};
exports.dummy = dummy;
const first = (param) => {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === 'string') {
        return param;
    }
    else {
        return undefined;
    }
};
/**
 * Retrieves the list of all file names currently stored in the `fileStore`.
 *
 * @param _req - The incoming request object (not used in this method).
 * @param res - The response object used to send back the list of file names.
 */
const names = (_req, res) => {
    const fileNames = Array.from(exports.fileMem.keys());
    res.send({ names: fileNames });
};
exports.names = names;
/**
 * Saves a file with a given name and content to the `fileStore`.
 *
 * @param req - The incoming request object containing the file name and content.
 * @param res - The response object used to send back the status of the save operation.
 */
const save = (req, res) => {
    const name = req.body.name;
    const contents = req.body.content;
    if (contents === undefined) {
        res.status(400).send('required argument "contents" was missing');
        return;
    }
    else if (name === undefined || typeof name !== 'string') {
        res.status(400).send('required argument "name" was missing');
        return;
    }
    exports.fileMem.set(name, contents);
    console.log(name, contents);
    res.send({ saved: true });
};
exports.save = save;
/**
 * Loads the content of a file with a given name from the `fileStore`.
 *
 * @param req - The incoming request object containing the file name in the query parameters.
 * @param res - The response object used to send back the file's content or null if the file does not exist.
 */
const load = (req, res) => {
    const name = first(req.query.name);
    if (name === undefined || typeof name !== "string") {
        res.status(400).send('required argument "name" was missing');
        return;
    }
    if (exports.fileMem.has(name)) {
        res.send({ name: name, content: exports.fileMem.get(name) });
    }
    else {
        res.send({ name: name, content: null });
    }
    ;
};
exports.load = load;
/**
 * Clears all files from the `fileStore`.
 * This method is primarily intended for use in testing environments.
 */
const forTesting = () => {
    exports.fileMem.clear();
};
exports.forTesting = forTesting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQSx1RUFBdUU7QUFDMUQsUUFBQSxPQUFPLEdBQXlCLElBQUksR0FBRyxFQUFtQixDQUFDO0FBR3hFOzs7O0dBSUc7QUFDSSxNQUFNLEtBQUssR0FBRyxDQUFDLEdBQWdCLEVBQUUsR0FBaUIsRUFBUSxFQUFFO0lBQ2pFLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ2pELE9BQU87S0FDUjtJQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDO0FBUlcsUUFBQSxLQUFLLFNBUWhCO0FBSUYsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFjLEVBQXNCLEVBQUU7SUFDbkQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hCO1NBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDcEMsT0FBTyxLQUFLLENBQUM7S0FDZDtTQUFNO1FBQ0wsT0FBTyxTQUFTLENBQUM7S0FDbEI7QUFDSCxDQUFDLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNJLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBaUIsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDbEUsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM3QyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBSFcsUUFBQSxLQUFLLFNBR2hCO0FBR0Y7Ozs7O0dBS0c7QUFDSSxNQUFNLElBQUksR0FBRyxDQUFDLEdBQWdCLEVBQUUsR0FBaUIsRUFBUSxFQUFFO0lBQ2hFLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzNCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2xDLElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtRQUMxQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1FBQ2pFLE9BQU87S0FDUjtTQUFNLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDekQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUM3RCxPQUFPO0tBQ1I7SUFDRCxlQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBYlcsUUFBQSxJQUFJLFFBYWY7QUFFRjs7Ozs7R0FLRztBQUNJLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDaEUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsSUFBSSxJQUFJLEtBQUssU0FBUyxJQUFFLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUNoRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQzdELE9BQU87S0FDUjtJQUNELElBQUksZUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNyQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUM7S0FDcEQ7U0FBTTtRQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0tBQ3ZDO0lBQUEsQ0FBQztBQUNKLENBQUMsQ0FBQTtBQVhZLFFBQUEsSUFBSSxRQVdoQjtBQUVEOzs7R0FHRztBQUNJLE1BQU0sVUFBVSxHQUFHLEdBQVMsRUFBRTtJQUNuQyxlQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDbEIsQ0FBQyxDQUFDO0FBRlcsUUFBQSxVQUFVLGNBRXJCIn0=