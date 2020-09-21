import testHelper, { TestFlowsItem } from "node-red-node-test-helper";
import krakenApiNode from "../nodes/kraken-api/kraken-api";
import { KrakenApiNodeDef } from "../nodes/kraken-api/modules/types";

type FlowsItem = TestFlowsItem<KrakenApiNodeDef>;
type Flows = Array<FlowsItem>;

describe("kraken-api node", () => {
  beforeEach((done) => {
    testHelper.startServer(done);
  });

  afterEach((done) => {
    testHelper.unload().then(() => {
      testHelper.stopServer(done);
    });
  });

  it("should be loaded", (done) => {
    const flows: Flows = [{ id: "n1", type: "kraken-api", name: "kraken-api" }];
    testHelper.load(krakenApiNode, flows, () => {
      const n1 = testHelper.getNode("n1");
      expect(n1).toBeTruthy();
      expect(n1.name).toEqual("kraken-api");
      done();
    });
  });
});
