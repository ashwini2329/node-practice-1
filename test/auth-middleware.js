import sinon from "sinon";
import { expect } from "chai";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/verifyJwtToken.js";

describe("verifyToken Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    // Mock the request, response, and next
    req = {
      header: sinon.stub(),
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  it("should return 401 if no token is provided", () => {
    req.header.withArgs("Authorization").returns(undefined);

    verifyToken(req, res, next);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: "No token, authorization denied" }))
      .to.be.true;
    expect(next.called).to.be.false; // Ensure next is not called
  });

  it("should call next() if a valid token is provided", () => {
    const fakeToken = "valid.jwt.token";
    const fakeUserId = { userId: "12345" };
    req.header.withArgs("Authorization").returns(`Bearer ${fakeToken}`);
    sinon.stub(jwt, "verify").returns(fakeUserId);

    verifyToken(req, res, next);

    expect(jwt.verify.calledWith(fakeToken, process.env.JWT_SECRET)).to.be.true;
    expect(req.user).to.equal(fakeUserId.userId);
    expect(next.called).to.be.true;

    jwt.verify.restore(); // Restore the original method
  });

  it("should return 401 if the token is invalid", () => {
    const fakeToken = "invalid.jwt.token";
    req.header.withArgs("Authorization").returns(`Bearer ${fakeToken}`);
    sinon.stub(jwt, "verify").throws(new Error("Invalid token"));

    verifyToken(req, res, next);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: "Token is not valid" })).to.be.true;
    expect(next.called).to.be.false;

    jwt.verify.restore(); // Restore the original method
  });
});
