import * as assert from 'assert';
import { solid, split, toJson, fromJson, findRoot, replace} from './square';
import { explode_array } from "./list";



describe('square', function() {

  it('toJson', function() {
    assert.deepStrictEqual(toJson(solid("white")), "white");
    assert.deepStrictEqual(toJson(solid("green")), "green");

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepStrictEqual(toJson(s1),
      ["blue", "orange", "purple", "white"]);

    const s2 = split(s1, solid("green"), s1, solid("red"));
    assert.deepStrictEqual(toJson(s2),
      [["blue", "orange", "purple", "white"], "green",
       ["blue", "orange", "purple", "white"], "red"]);

    const s3 = split(solid("green"), s1, solid("yellow"), s1);
    assert.deepStrictEqual(toJson(s3),
      ["green", ["blue", "orange", "purple", "white"],
       "yellow", ["blue", "orange", "purple", "white"]]);
  });

  it('fromJson', function() {
    assert.deepStrictEqual(fromJson("white"), solid("white"));
    assert.deepStrictEqual(fromJson("green"), solid("green"));

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepStrictEqual(fromJson(["blue", "orange", "purple", "white"]), s1);

    assert.deepStrictEqual(
        fromJson([["blue", "orange", "purple", "white"], "green",
                 ["blue", "orange", "purple", "white"], "red"]),
        split(s1, solid("green"), s1, solid("red")));

    assert.deepStrictEqual(
        fromJson(["green", ["blue", "orange", "purple", "white"],
                  "yellow", ["blue", "orange", "purple", "white"]]),
        split(solid("green"), s1, solid("yellow"), s1));
  });

  it("findRoot", function () {
    const s1 = split(solid("yellow"), solid("red"), solid("green"), solid("purple"));
    const s2 = split(s1, solid("white"), solid("yellow"), s1);
    const s3 = split(solid("green"), s1, solid("orange"), s2);

    // Test invalid paths that should throw an error
    assert.throws(() => findRoot(s1, explode_array(["SE", "NW"])), Error);
    //assert.throws(() => findRoot(s2, explode_array(["NW", "SW"])), Error);
     

    //0-1-many, no provided path, base case, 
    assert.deepEqual(findRoot(s1, explode_array([])), s1);
    assert.deepEqual(findRoot(s2, explode_array([])), s2);

    //0-1-many, 1 recursive call
    assert.deepEqual(findRoot(s3, explode_array(["NW"])), solid("green"));
    assert.deepEqual(findRoot(s2, explode_array(["NE"])), solid("white"));
    assert.deepEqual(findRoot(s3, explode_array(["SE"])), s2);
    
    //0-1-many, many recursive call
    assert.deepEqual(findRoot(s2, explode_array(["SE", "SE"])), solid("purple"));
    assert.deepEqual(findRoot(s2, explode_array(["NW", "SW"])), solid("green"));
    assert.deepEqual(findRoot(s2, explode_array(["NW", "NE"])), solid("red"));


  });

  it('replace', function() {
    const s1 = split(solid("white"), solid("red"), solid("red"), solid("white"));
    const s2 = split(s1, s1, solid("blue"), solid("purple"));

    //base case no directions
    assert.deepEqual(replace(s1, explode_array([]), solid("yellow")), solid("yellow"));

    // other directions
    assert.deepEqual(replace(s2, explode_array(["NW"]), solid("purple")), 
      split(solid("purple"), s1, solid("blue"), solid("purple")));
    assert.deepEqual(replace(s2, explode_array(["SW"]), solid("purple")),
      split(s1, s1, solid("purple"), solid("purple")));
  });
});
