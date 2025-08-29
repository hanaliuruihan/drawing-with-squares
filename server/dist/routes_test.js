"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const httpMocks = __importStar(require("node-mocks-http"));
const routes_1 = require("./routes");
describe('routes', function () {
    // After you know what to do, feel free to delete this Dummy test
    it('dummy', function () {
        // You can copy this test structure to start your own tests, these comments
        // are included as a reminder of how testing routes works:
        // httpMocks lets us create mock Request and Response params to pass into our route functions
        const req1 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        { method: 'GET', url: '/api/dummy', query: { name: 'Zach' } });
        const res1 = httpMocks.createResponse();
        // call our function to execute the request and fill in the response
        (0, routes_1.dummy)(req1, res1);
        // check that the request was successful
        assert.deepStrictEqual(res1._getStatusCode(), 200);
        // and the response data is as expected
        assert.deepStrictEqual(res1._getData(), { greeting: 'Hi, Zach' });
    });
    it('save', function () {
        // branch, straight line code, error case (only one possible input)
        const rq2 = httpMocks.createRequest({ method: 'POST', url: '/save', body: { name: "test0" } });
        const rs2 = httpMocks.createResponse();
        (0, routes_1.save)(rq2, rs2);
        assert.strictEqual(rs2._getStatusCode(), 400);
        assert.deepStrictEqual(rs2._getData(), 'required argument "contents" was missing');
        // brach of straight line code
        const rq3 = httpMocks.createRequest({ method: 'POST', url: '/save', body: { name: "A", content: "test1" } });
        const rs3 = httpMocks.createResponse();
        (0, routes_1.save)(rq3, rs3);
        assert.strictEqual(rs3._getStatusCode(), 200);
        assert.deepStrictEqual(rs3._getData(), { saved: true });
        // brach error case there is only 1 input possible
        const rq = httpMocks.createRequest({ method: 'POST', url: '/save', body: { content: "test2" } });
        const rs = httpMocks.createResponse();
        (0, routes_1.save)(rq, rs);
        assert.strictEqual(rs._getStatusCode(), 400);
        assert.deepStrictEqual(rs._getData(), 'required argument "name" was missing');
        //straight line branch
        const rq4 = httpMocks.createRequest({ method: 'POST', url: '/save', body: { name: "A", content: "test3" } });
        const rs4 = httpMocks.createResponse();
        (0, routes_1.save)(rq4, rs4);
        assert.strictEqual(rs4._getStatusCode(), 200);
        assert.deepStrictEqual(rs4._getData(), { saved: true });
        // Called to clear all saved files created in this test
        //    to not effect future tests
        (0, routes_1.forTesting)();
    });
    // TODO: add tests for your routes
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQywyREFBNkM7QUFDN0MscUNBQStEO0FBRy9ELFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFFakIsaUVBQWlFO0lBQ2pFLEVBQUUsQ0FBQyxPQUFPLEVBQUU7UUFDViwyRUFBMkU7UUFDM0UsMERBQTBEO1FBRTFELDZGQUE2RjtRQUM3RixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsYUFBYTtRQUNoQyxpRkFBaUY7UUFDakYsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxFQUFDLENBQUMsQ0FBQztRQUMvRCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsb0VBQW9FO1FBQ3BFLElBQUEsY0FBSyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsQix3Q0FBd0M7UUFDeEMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQsdUNBQXVDO1FBQ3ZDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsTUFBTSxFQUFFO1FBRVQsbUVBQW1FO1FBQ25FLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMs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