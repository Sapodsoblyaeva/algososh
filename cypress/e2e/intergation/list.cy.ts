import { circlesElements, circlesStateChanging, circlesStateDefault, circlesStateModified, input, inputIndex, inputValue, listAddButton, listDeleteButton, listIndexAddButton, listIndexDeleteButton } from "../../../src/constants/e2eSelectors";

describe("list", () => {
  beforeEach(() => {
    cy.visit("/list");
  });

  it("should have disabled buttons if inputs are empty", () => {
    cy.get(input).should("have.value", "");
    cy.get(listAddButton).should("be.disabled");
    cy.get(listIndexAddButton).should("be.disabled");
    cy.get(listIndexDeleteButton).should("be.disabled");

    cy.get(circlesElements).should("have.length", "4");
    cy.get(listDeleteButton).should("not.be.disabled");

    cy.get(inputValue).type("23");
    cy.get(listAddButton).should("not.be.disabled");
    cy.get(listIndexAddButton).should("be.disabled");
    cy.get(listIndexDeleteButton).should("be.disabled");

    cy.get(`${listAddButton}[value=head]`).click();

    cy.wait(500);
    cy.get(inputValue).should("have.value", "");
    cy.get(listAddButton).should("be.disabled");
    cy.get(listIndexAddButton).should("be.disabled");
    cy.get(listIndexDeleteButton).should("be.disabled");

    cy.get(inputValue).type("23");
    cy.get(inputIndex).type("2");
    cy.get(listAddButton).should("not.be.disabled");
    cy.get(listIndexAddButton).should("not.be.disabled");

    cy.get(listIndexAddButton).click();

    cy.wait(500);
    cy.get(inputValue).should("have.value", "");
    cy.get(inputIndex).should("have.value", "");
    cy.get(listAddButton).should("be.disabled");
    cy.get(listIndexAddButton).should("be.disabled");
    cy.get(listIndexDeleteButton).should("be.disabled");

    cy.get(inputIndex).type("2");
    cy.get(listIndexDeleteButton).should("not.be.disabled");
    cy.get(listIndexAddButton).should("be.disabled");

    cy.get(listIndexDeleteButton).click();
    cy.wait(500);
    cy.get(inputIndex).should("have.value", "");
  });

  it("should have default list after first render", () => {
    cy.get(circlesElements)
      .should("have.length", 4)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains("1");
          cy.wrap($el).contains("head");
        }
        if (index === 1) {
          cy.wrap($el).contains("8");
        }
        if (index === 2) {
          cy.wrap($el).contains("34");
        }
        if (index === 3) {
          cy.wrap($el).contains("0");
          cy.wrap($el).contains("tail");
        }
      });
  });

  it("should add elem to the head of the list correctly", () => {
    cy.get(inputValue).type("3");
    cy.get(`${listAddButton}[value=head]`).click();

    cy.wait(500);

    cy.get(circlesElements)
      .filter(":nth-child(1)")
      .as("firstAddedElement");

    cy.get("@firstAddedElement").get(circlesStateChanging);
    cy.get("@firstAddedElement").contains("3");
    cy.get("@firstAddedElement").contains("head");
    cy.get(circlesElements).each(($el, index) => {
      if (index === 1) {
        cy.wrap($el).contains("1");
        cy.wrap($el).should("not.contain", "head");
      }
    });
    cy.get("@firstAddedElement").get(circlesStateModified);
  });

  it("should add elem to the tail of the list correctly", () => {
    cy.get(inputValue).type("3");
    cy.get(`${listAddButton}[value=tail]`).click();

    cy.get("[data-testid=circle]").as("circles");
    cy.get("@circles").contains("3").get(circlesStateChanging);
    cy.get("@circles").contains("0").get(circlesStateChanging);

    cy.wait(1000);
    cy.get("@circles").each(($el, index) => {
      if (index === 4) {
        cy.wrap($el).should("contain", "3");
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el).get(circlesStateModified);
      }
      if (index === 3) {
        cy.wrap($el).should("contain", "0");
        cy.wrap($el).should("not.contain", "tail");
        cy.wrap($el).get(circlesStateDefault);
      }
    });
    cy.wait(500);
    cy.get("@circles").get(circlesStateDefault);
  });

  it("should add elem by the index to the list correctly", () => {
    cy.get(inputValue).type("3");
    cy.get(inputIndex).type("1");
    cy.get(listIndexAddButton).click();

    cy.get("[data-testid=circle]").as("circles");

    cy.get("@circles").contains("8").get(circlesStateDefault);
    cy.get("@circles").contains("3").get(circlesStateChanging);
    cy.get("@circles").contains("1").get(circlesStateChanging);

    cy.wait(500);
    cy.get("@circles").contains("8").get(circlesStateChanging);
    cy.wait(500);
    cy.get("@circles").contains("3").get(circlesStateModified);

    cy.get("@circles").each(($el, index) => {
      if (index === 1) {
        cy.wrap($el).should("contain", "3");
      }
      if (index === 2) {
        cy.wrap($el).should("contain", "8");
      }
    });
  });

  it("should delete elem by the index to the list correctly", () => {
    cy.get(inputIndex).type("1");
    cy.get(listIndexDeleteButton).click();

    cy.get("[data-testid=circle]").as("circles");
    cy.get("[data-testid=circle-tail]").as("smallCircles");

    cy.get("@smallCircles").contains("8").get(circlesStateChanging);
    cy.get("@circles").contains("1").get(circlesStateChanging);
    cy.get("@circles").contains("8").get(circlesStateDefault);

    cy.wait(1000);

    cy.get("@circles").each(($el, index) => {
      if (index === 1) {
        cy.wrap($el).should("have.value", "");
        cy.wrap($el).get(circlesStateChanging);
      }

      if (index === 0) {
        cy.wrap($el).get(circlesStateChanging);
      }
    });
    cy.wait(1500);
    cy.get("@circles").get(circlesStateDefault);
  });

  it("should delete elem from the head of the list correctly", () => {
    cy.get("[data-testid=circle]").as("circles");
    cy.get("[data-testid=circle-tail]").as("smallCircles");

    cy.get("@circles").first().as("headElem");
    cy.get("@headElem").contains("1");
    cy.get("@headElem").contains("head");
    cy.get("@headElem").get(circlesStateDefault);

    cy.get(`${listDeleteButton}[value=head]`).click();

    cy.get("@headElem").should("have.value", "");
    cy.get("@headElem").get(circlesStateChanging);
    cy.get("@smallCircles").contains("1").get(circlesStateChanging);

    cy.wait(1000);

    cy.get("@headElem").contains("8");
    cy.get("@headElem").contains("head");
    cy.get("@headElem").get(circlesStateDefault);
  });

  it("should delete elem from the tail of the list correctly", () => {
    cy.get("[data-testid=circle]").as("circles");
    cy.get("[data-testid=circle-tail]").as("smallCircles");

    cy.get("@circles").last().as("tailElem");
    cy.get("@tailElem").contains("0");
    cy.get("@tailElem").contains("tail");
    cy.get("@tailElem").get(circlesStateDefault);

    cy.get(`${listDeleteButton}[value=tail]`).click();
    cy.get("@tailElem").get(circlesStateChanging);
    cy.get("@tailElem").should("have.value", "");
    cy.get("@smallCircles").contains("0").get(circlesStateChanging);

    cy.wait(1000);

    cy.get("@tailElem").contains("34");
    cy.get("@tailElem").contains("tail");
    cy.get("@tailElem").get(circlesStateDefault);
  });
});
