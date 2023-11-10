

type Method = "get" | "options" | "post" | "put" | "patch" | "delete";
    
// https://httpstat.us
export enum Status {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  RequestEntityTooLarge = 413,
  RequestURITooLong = 414,
  UnsupportedMediaType = 415,
  RequestedRangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  Imateapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  TooEarly = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HTTPVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  NetworkAuthenticationRequired = 511,
  Webserverisreturninganunknownerror = 520,
  Connectiontimedout = 522,
  Atimeoutoccurred = 524
}

/**
 * Stub API request, response in test cases.
 * - should be initialized and destroyed within the context of a specific case.
 * - highly customizable
 *
 * <pre>
 *  describe("Fetch API", () => {
 *    let fetchResolver!: FetchResolver;
 *      beforeEach(() => {
 *      fetchResolver = new FetchResolver();
 *    });
 *
 *    it("should load api", async () => {
 *      // stub
 *      fetchResolver.stub( "http://localhost:8080/endpoint", "post", { id: 100 }, { created: true }, 200);
 *      // fetch
 *      fetch("http://localhost:8080/endpoint",
 *        { method: "post", body: JSON.stringify({ id: 100 })}
 *      ).then((response) => {
 *        if (response.ok) {
 *          response.text().then((text) => {
 *            console.log(text); // { created: true }
 *            expect(text).toBeEqual({ created: true });
 *          });
 *        }
 *      });
 *    });
 *
 *    afterEach(() => {
 *      fetchResolver.clear();
 *    });
 *  });
 * </pre>
 *
 * https://gist.github.com/mukundhan94/102334a8ba9b84d93a1b5ba4b7838647
 * Even though jest executes tests in parallel jest instance,
 * We can't go wrong if stubs are cleaned after its use
 */
export class FetchResolver {
  private mocks: Map<string, Response> = new Map();
  private spy!: jest.SpyInstance<Promise<Response>, [input: RequestInfo | URL, init?: RequestInit | undefined]>;
  constructor(timeout = 0) {
    this.init(timeout);
  }

  public stub(
    uri: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    response: any,
    status: Status,
    payload?: BodyInit,
    headers?: HeadersInit,
    credentials?: RequestCredentials,
  ) {
    const finalRequest: { input: RequestInfo | URL; init?: RequestInit } = {
      input: uri
    };
    const init: RequestInit = {};
    if (method !== "GET") {
      init.method = method;
    }
    if (credentials) {
      init.credentials = credentials;
    }
    if (headers) {
      init.headers = headers;
    }
    if (payload) {
      init.body = payload;
    }
    if (credentials || headers || payload) {
      finalRequest.init = init;
    }
    // console.log(
    //   `mocking fetch :::\nrequest ${this.prettyPrint(
    //     finalRequest
    //   )} with \nresponse ${this.prettyPrint(response)} ans status ${status}`
    // );
    this.mocks.set(
      JSON.stringify(finalRequest),
      new Response(JSON.stringify(response), { status: status })
    );
  }

  private prettyPrint(json: any) {
    return JSON.stringify(json, null, 2);
  }

  public clear() {
    this.mocks.clear();
  }

  private init(timeout: number) {
    this.spy = jest
      .spyOn(global, "fetch")
      .mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
        const request = {
          input,
          init
        };
        return new Promise((resolve) => setTimeout(() => {
          let response = this.mocks.get(JSON.stringify(request));
          if (response) {
            resolve(response);
          } else {
            // rejecting here will hurt component initialization
            console.error(
              `mock not implemented :::\nrequest ${this.prettyPrint(request)}`
            );
            // return empty response
            resolve(new Response("{}"));
          }
        }, input ===  "/chat-gpt" ? timeout : 0));
      });
  }
  public getSpy() {
    return this.spy;
  }
  public static initialize() {
    let resolver = new FetchResolver();
    resolver.stub(
      "http://localhost:8080/endpoint",
      "POST",
      {
        created: true
      },
      200,
      JSON.stringify({ id: 100 })
    );
    fetch("http://localhost:8080/endpoint", {
      method: "POST",
      body: JSON.stringify({ id: 100 })
    }).then((response) => {
      if (response.ok) {
        response.text().then((text) => {
          console.log(text); // { created: true }
        });
      }
    });
  }
}