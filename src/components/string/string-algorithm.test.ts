import { reverseString } from "./algorithm";

describe("string algorithm tests", () => {
  beforeEach(() => {});

  beforeAll(() => {});

  it("reverse string with even number of letters", () => {
    const newstring = reverseString("even");

    expect(newstring.slice(newstring.length - 1)[0].join("")).toBe("neve");
  });

  it("reverse string with odd number of letters", () => {
    const newstring = reverseString("hello");

    expect(newstring.slice(newstring.length - 1)[0].join("")).toBe("olleh");
  });

  it("reverse string with one letter", () => {
    const newstring = reverseString("h");

    expect(newstring.slice(newstring.length - 1)[0].join("")).toBe("h");
  });

  it("reverse string without letters", () => {
    const newstring = reverseString("");

    expect(newstring.length).toBe(1);
  });

  afterAll(() => {});
});
