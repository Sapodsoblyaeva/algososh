import { addButtonElem, circlesElements, circlesStateChanging, circlesStateDefault, clearButtonElem, deleteButtonElem, input } from "../../../src/constants/e2eSelectors";

describe("stack", () => {
  beforeEach(() => {
    cy.visit("/stack");
  });

  it("should have disabled button if input is empty", () => {

    cy.get(input).should('have.value', '');
    cy.get(addButtonElem).should("be.disabled");
    cy.get(deleteButtonElem).should("be.disabled");
    cy.get(clearButtonElem).should("be.disabled");

    cy.get(input).type("5");
    cy.get(addButtonElem).should("not.be.disabled");
    cy.get(addButtonElem).click();

    cy.wait(1000)
    cy.get(deleteButtonElem).should("not.be.disabled");
    cy.get(clearButtonElem).should("not.be.disabled");

    cy.wait(1000)
    cy.get(addButtonElem).should("be.disabled");
  });

  it("should add data to the stack correctly", () => {

    cy.get(input).type("5");
    cy.get(addButtonElem).click();

    cy.wait(500);
    cy.get(circlesElements)
      .filter(":nth-child(1)")
      .as("firstAddedElement");
    cy.get("@firstAddedElement").contains("5");
    cy.get("@firstAddedElement").contains("top");
    cy.get("@firstAddedElement").get(circlesStateChanging);

    cy.wait(500);
    cy.get("@firstAddedElement").get(circlesStateDefault);

    cy.get(input).type("34");
    cy.get(addButtonElem).click();

    cy.wait(500);
    cy.get(circlesElements)
      .filter(":nth-child(2)")
      .as("secondAddedElement");
    cy.get("@secondAddedElement").contains("34");
    cy.get("@secondAddedElement").contains("top");
    cy.get("@secondAddedElement").get(circlesStateChanging);
    cy.get("@firstAddedElement").contains("5");
    cy.get("@firstAddedElement").should("not.contain", "top");
    cy.get("@firstAddedElement").get(circlesStateDefault);

    cy.wait(500);
    cy.get("@secondAddedElement").get(circlesStateDefault);
  });

  it("should delete data from the stack correctly", () => {

    cy.get(input).type("5");
    cy.get(addButtonElem).click();

    cy.wait(500);
    cy.get(input).type("34");
    cy.get(addButtonElem).click();

    cy.wait(2000);
    cy.get(deleteButtonElem).click();
    cy.get(circlesElements)
      .filter(":nth-child(2)")
      .as("secondAddedElement");
    cy.get("@secondAddedElement").contains("34");
    cy.get("@secondAddedElement").contains("top");
    cy.get("@secondAddedElement").get(circlesStateChanging);

    cy.wait(1000);
    cy.get("@secondAddedElement").should("not.exist");
    cy.get(circlesElements)
      .filter(":nth-child(1)")
      .as("firstAddedElement");
    cy.get("@firstAddedElement").contains("5");
    cy.get("@firstAddedElement").contains("top");
    cy.get("@firstAddedElement").get(circlesStateDefault);
  });

  it("should clear all data correctly", () => {

    cy.get(input).type("5");
    cy.get(addButtonElem).click();

    cy.wait(500);
    cy.get(input).type("34");
    cy.get(addButtonElem).click();

    cy.wait(500);
    cy.get(input).type("75");
    cy.get(addButtonElem).click();

    cy.wait(2000);
    cy.get(clearButtonElem).click();
    cy.get(circlesElements).should("not.exist");
    cy.get(circlesElements).should("have.length", "0");
  });
});
