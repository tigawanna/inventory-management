import  {doc, Endpoint} from "express-openapi-decorator"

@doc({
  security: [{ basicAuth: [] }],
})
class SecureEndpoint extends Endpoint {
  handler() {
    if (
      this.req.headers["authorization"] !== `Basic ${btoa("user:password")}`
    ) {
      throw new Error("Invalid credential");
    }
    this.next();
  }
}

@doc({
  summary: "This endpoint will display Hello world.",
})
class HelloWorld extends Endpoint {
  handler() {
    this.res.send("Hello world");
  }
}

// router.get("/api/hello", new SecureEndpoint(), new HelloWorld());
