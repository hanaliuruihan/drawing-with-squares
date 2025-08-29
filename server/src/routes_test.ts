import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { dummy,save, load, names, forTesting } from './routes';


describe('routes', function() {

  // After you know what to do, feel free to delete this Dummy test
  it('dummy', function() {
    // You can copy this test structure to start your own tests, these comments
    // are included as a reminder of how testing routes works:

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req1 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'GET', url: '/api/dummy', query: {name: 'Zach'}}); 
    const res1 = httpMocks.createResponse();
    // call our function to execute the request and fill in the response
    dummy(req1, res1);
    // check that the request was successful
    assert.deepStrictEqual(res1._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepStrictEqual(res1._getData(), {greeting: 'Hi, Zach'});
  });

  it('save', function () {

    // branch, straight line code, error case (only one possible input)
    const rq2 = httpMocks.createRequest({ method: 'POST', url: '/save', body: { name: "test0" } });
    const rs2 = httpMocks.createResponse();
    save(rq2, rs2);
    assert.strictEqual(rs2._getStatusCode(), 400);
    assert.deepStrictEqual(rs2._getData(),'required argument "contents" was missing');
    
    // brach of straight line code
    const rq3 = httpMocks.createRequest({method: 'POST', url: '/save', body: { name: "A", content: "test1" }});
    const rs3 = httpMocks.createResponse();
    save(rq3, rs3);
    assert.strictEqual(rs3._getStatusCode(), 200);
    assert.deepStrictEqual(rs3._getData(), { saved: true });

    // brach error case there is only 1 input possible
    const rq = httpMocks.createRequest({ method: 'POST', url: '/save', body: { content: "test2" } });
    const rs = httpMocks.createResponse();
    save(rq, rs);
    assert.strictEqual(rs._getStatusCode(), 400);
    assert.deepStrictEqual(rs._getData(),'required argument "name" was missing');

    //straight line branch
    const rq4 = httpMocks.createRequest({method: 'POST', url: '/save',body: { name: "A", content: "test3" }});
    const rs4 = httpMocks.createResponse();
    save(rq4, rs4);

    assert.strictEqual(rs4._getStatusCode(), 200);
    assert.deepStrictEqual(rs4._getData(), { saved: true });

    // Called to clear all saved files created in this test
    //    to not effect future tests
    forTesting();
  });


  it('files', function () {
    // only one file
    const sq1 = httpMocks.createRequest({method: 'POST', url: '/save',body: { name: "test1", content: "test11" }});
    const rsp1 = httpMocks.createResponse();
    save(sq1, rsp1);

    const sq2 = httpMocks.createRequest({ method: 'GET', url: '/load', query: {} });
    const rsp2 = httpMocks.createResponse();
    names(sq2, rsp2);
    assert.strictEqual(rsp2._getStatusCode(), 200);
    assert.deepStrictEqual(rsp2._getData(), { names: ["test1"] });

    const sq3 = httpMocks.createRequest({ method: 'GET', url: '/load', query: {} });
    const rsp3 = httpMocks.createResponse();
    names(sq3, rsp3);
    assert.strictEqual(rsp3._getStatusCode(), 200); 
    assert.deepStrictEqual(rsp3._getData(), { names: ["test1"] });
    forTesting();

    const sq4 = httpMocks.createRequest({method: 'POST', url: '/save',body: { name: "test4", content: "test44" }});
    const rsp4 = httpMocks.createResponse();
    save(sq4, rsp4);

    forTesting();

    const test1 = httpMocks.createRequest({method: 'POST', url: '/save',body: { name: "test1", content: "test" }});
    const testr2 = httpMocks.createResponse();
    save(test1, testr2);
    const test11 = httpMocks.createRequest({ method: 'GET', url: '/load', query: {} });
    const test111 = httpMocks.createResponse();
    names(test11, test111);

    const test2 = httpMocks.createRequest({method: 'POST', url: '/save',body: { name: "test22", content: "test44" }});
    const testr4 = httpMocks.createResponse();
    save(test2, testr4);
    const test22 = httpMocks.createRequest({ method: 'GET', url: '/load', query: {} });
    const test44 = httpMocks.createResponse();
    names(test22, test44);

    
    forTesting();
  });

  it('load', function () {

    const sq1 = httpMocks.createRequest({method: 'POST', url: '/save', body: { name: "test1", content: undefined }});
    const srsp1 = httpMocks.createResponse();
    save(sq1, srsp1);
    const lq1 = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: "test1" } });
    const lrs1 = httpMocks.createResponse();
    load(lq1, lrs1);
    assert.strictEqual(lrs1._getStatusCode(), 200);
    assert.deepStrictEqual(lrs1._getData(), {name: "test1", content: null});

    const sq2 = httpMocks.createRequest({method: 'POST', url: '/save',body: { name: "test2", content: undefined }});
    const srsp2 = httpMocks.createResponse();
    save(sq2, srsp2);
    const lq2 = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: "test2" } });
    const lrs2 = httpMocks.createResponse();
    load(lq2, lrs2);
    assert.strictEqual(lrs2._getStatusCode(), 200);
    assert.deepStrictEqual(lrs2._getData(), {name: "test2", content: null});

    const sq3 = httpMocks.createRequest({method: 'POST', url: '/save', body: { name: "test3", content: "test3c" }});
    const srsp3 = httpMocks.createResponse();
    save(sq3, srsp3);
    const lq3 = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: "test3" } });
    const lrs3 = httpMocks.createResponse();
    load(lq3, lrs3);
    assert.strictEqual(lrs3._getStatusCode(), 200);
    assert.deepStrictEqual(lrs3._getData(), { name: "test3", content: "test3c" });

    const sq4 = httpMocks.createRequest({method: 'POST', url: '/save',body: { name: undefined, content: "test4c" }});
    const srsp4 = httpMocks.createResponse();
    save(sq4, srsp4);
    const lq4 = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: undefined } });
    const lrs4 = httpMocks.createResponse();
    load(lq4, lrs4);
    assert.strictEqual(lrs4._getStatusCode(), 400);
    assert.deepStrictEqual(lrs4._getData(), 'required argument "name" was missing');


    const sq5 = httpMocks.createRequest({method: 'POST', url: '/save',body: { name: "test5", content: "test5c" }});
    const srsp5 = httpMocks.createResponse();
    save(sq5, srsp5);
    const lq5 = httpMocks.createRequest({ method: 'GET', url: '/load', query: { name: "test5" } });
    const lrs5 = httpMocks.createResponse();
    load(lq5, lrs5);
    assert.strictEqual(lrs5._getStatusCode(), 200);
    assert.deepStrictEqual(lrs5._getData(), {name: "test5", content: "test5c" });

    forTesting();
  });

  // TODO: add tests for your routes
});
