import {button, circlesElements, circlesStateChanging, circlesStateDefault, circlesStateModified, input} from "../../../src/constants/e2eSelectors"

describe("string reverse", () => {

  beforeEach(() => {
    cy.visit("/recursion");
  })

  it("should have disabled button if input is empty", () => {

    cy.get(input).should("be.empty");
    cy.get(button).should("be.disabled");

    cy.get(input).type("cypress");
    cy.get(button).should("not.be.disabled");
  });

  it("should reverse the string correctly and with animation", () => {

    cy.get(input).type("pina");
    cy.get(button).contains("Развернуть").click();

    cy.get(circlesElements).get(circlesStateDefault);
    cy.get(circlesElements).filter(":nth-child(1)").as("firstLetter")
    cy.get('@firstLetter').contains("p");

    cy.get(circlesElements).filter(":nth-child(2)").as("secondLetter")
    cy.get('@secondLetter').contains("i");

    cy.get(circlesElements).filter(":nth-child(3)").as("thirdLetter")
    cy.get("@thirdLetter").contains("n");

    cy.get(circlesElements).filter(":nth-child(4)").as('forthLetter')
    cy.get("@forthLetter").contains("a");

    cy.wait(500);
    cy.get('@firstLetter')
      .contains("p")
      .get(circlesStateChanging);
      cy.get('@secondLetter')
      .contains("i")
      .get(circlesStateDefault);
      cy.get('@thirdLetter')
      .contains("n")
      .get(circlesStateDefault);
      cy.get('@forthLetter')
      .contains("a")
      .get(circlesStateChanging);

    cy.wait(500);
    cy.get('@forthLetter')
      .contains("p")
      .get(circlesStateModified);
      cy.get('@firstLetter')
      .contains("a")
      .get(circlesStateModified);
      cy.get('@secondLetter')
      .contains("i")
      .get(circlesStateChanging);
      cy.get('@thirdLetter')
      .contains("n")
      .get(circlesStateChanging);

    cy.wait(500);
    cy.get('@secondLetter')
      .contains("n")
      .get(circlesStateModified);
      cy.get('@thirdLetter')
      .contains("i")
      .get(circlesStateModified);

    cy.wait(500);
    cy.get(circlesElements).get(circlesStateModified);
    cy.get('@firstLetter').contains("a");
    cy.get('@secondLetter').contains("n");
    cy.get('@thirdLetter').contains("i");
    cy.get('@forthLetter').contains("p");
  });
});
