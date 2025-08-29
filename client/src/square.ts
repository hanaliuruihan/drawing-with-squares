import { List } from './list';


export type Color = "white" | "red" | "orange" | "yellow" | "green" | "blue" | "purple";

/**
 * Converts a string to a color (or throws an exception if not a color).
 * @param s string to convert to color
 */
export const toColor = (s: string): Color => {
  switch (s) {
    case "white": case "red": case "orange": case "yellow":
    case "green": case "blue": case "purple":
      return s;

    default:
      throw new Error(`unknown color "${s}"`);
  }
};

export type Square =
    | {readonly kind: "solid", readonly color: Color}
    | {readonly kind: "split", readonly nw: Square, readonly ne: Square,
       readonly sw: Square, readonly se: Square};

/**
 * Returns a solid square of the given color.
 * @param color of square to return
 * @returns square of given color
 */
export const solid = (color: Color): Square => {
  return {kind: "solid", color: color};
};

/**
 * Returns a square that splits into the four given parts.
 * @param nw square in nw corner of returned square
 * @param ne square in ne corner of returned square
 * @param sw square in sw corner of returned square
 * @param se square in se corner of returned square
 * @returns new square composed of given squares
 */
export const split =
    (nw: Square, ne: Square, sw: Square, se: Square): Square => {
  return {kind: "split", nw: nw, ne: ne, sw: sw, se: se};
};

export type Dir = "NW" | "NE" | "SE" | "SW";

/** Describes how to get to a square from the root of the tree. */
export type Path = List<Dir>;


/**
 * Creates a JSON representation of given Square.
 * @param sq to convert to JSON
 * @returns JSON describing the given square
 */
export const toJson = (sq: Square): unknown => {
  if (sq.kind === "solid") {
    return sq.color;
  } else {
    return [toJson(sq.nw), toJson(sq.ne), toJson(sq.sw), toJson(sq.se)];
  }
};

/**
 * Converts a JSON description to the Square it describes.
 * @param data in JSON form to try to parse as Square
 * @returns a Square parsed from given data
 */
export const fromJson = (data: unknown): Square => {
  if (typeof data === 'string') {
    return solid(toColor(data))
  } else if (Array.isArray(data)) {
    if (data.length === 4) {
      return split(fromJson(data[0]), fromJson(data[1]),
                   fromJson(data[2]), fromJson(data[3]));
    } else {
      throw new Error('split must have 4 parts');
    }
  } else {
    throw new Error(`type ${typeof data} is not a valid square`);
  }
}

/**
 * 
 * @param s 
 * @param p 
 * @returns 
 */
export const findRoot = (s:Square, p:Path): Square => {
  if (p.kind === "nil") {
    return s;
  } else if (s.kind === "solid") {
    throw new Error("Invalid path");
  } else if (p.hd === "NW"){
    return findRoot(s.nw, p.tl);
  } else if (p.hd === "NE"){
    return findRoot(s.ne, p.tl);
  } else if (p.hd === "SW"){
    return findRoot(s.sw, p.tl);
  } else {
    return findRoot(s.se, p.tl);
  }
}

/**
 * 
 * @param first 
 * @param p 
 * @param second 
 */
export const replace = (s1:Square, p:Path, s2:Square):Square =>{
  if (p.kind === "nil"){
    return s2;
  } else if (s1.kind === "solid"){
    throw new Error ("Invalid path");
  } else if (p.hd === "NE"){
    return split(s1.nw, replace(s1.ne, p.tl, s2), s1.sw, s1.se);
  } else if (p.hd === "NW"){
    return split(replace(s1.nw, p.tl, s2), s1.ne, s1.sw, s1.se);
  } else if (p.hd === "SE"){
    return split(s1.nw, s1.ne, s1.sw, replace(s1.se, p.tl, s2));
  } else {
    return split(s1.nw, s1.ne, replace(s1.sw, p.tl, s2), s1.se);
  }
}