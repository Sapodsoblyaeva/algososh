describe("list", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("should have disabled buttons if inputs are empty", () => {
    cy.get("input").should("have.value", "");
    cy.get("button[name=add-button]").should("be.disabled");
    cy.get("button[name=add-index-button]").should("be.disabled");
    cy.get("button[name=delete-index-button]").should("be.disabled");

    cy.get("[class*=circle_content]").should("have.length", "4");
    cy.get("button[name=delete-button]").should("not.be.disabled");

    cy.get("input[name=inputValueStr]").type("23");
    cy.get("button[name=add-button]").should("not.be.disabled");
    cy.get("button[name=add-index-button]").should("be.disabled");
    cy.get("button[name=delete-index-button]").should("be.disabled");

    cy.get("button[name=add-button][value=head]").click();

    cy.wait(500);
    cy.get("input[name=inputValueStr]").should("have.value", "");
    cy.get("button[name=add-button]").should("be.disabled");
    cy.get("button[name=add-index-button]").should("be.disabled");
    cy.get("button[name=delete-index-button]").should("be.disabled");

    cy.get("input[name=inputValueStr]").type("23");
    cy.get("input[name=inputValueNum]").type("2");
    cy.get("button[name=add-button]").should("not.be.disabled");
    cy.get("button[name=add-index-button]").should("not.be.disabled");

    cy.get("button[name=add-index-button]").click();

    cy.wait(500);
    cy.get("input[name=inputValueStr]").should("have.value", "");
    cy.get("input[name=inputValueNum]").should("have.value", "");
    cy.get("button[name=add-button]").should("be.disabled");
    cy.get("button[name=add-index-button]").should("be.disabled");
    cy.get("button[name=delete-index-button]").should("be.disabled");

    cy.get("input[name=inputValueNum]").type("2");
    cy.get("button[name=delete-index-button]").should("not.be.disabled");
    cy.get("button[name=add-index-button]").should("be.disabled");

    cy.get("button[name=delete-index-button]").click();
    cy.wait(500);
    cy.get("input[name=inputValueNum]").should("have.value", "");
  });

  it("should have default list after first render", () => {
    cy.get("[class*=circle_content]")
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
    cy.get("input[name=inputValueStr]").type("3");
    cy.get("button[name=add-button][value=head]").click();

    cy.wait(500);

    cy.get("[class*=circle_content]")
      .filter(":nth-child(1)")
      .as("firstAddedElement");

    cy.get("@firstAddedElement").get("[class*=circle_changing]");
    cy.get("@firstAddedElement").contains("3");
    cy.get("@firstAddedElement").contains("head");
    cy.get("[class*=circle_content]").each(($el, index) => {
      if (index === 1) {
        cy.wrap($el).contains("1");
        cy.wrap($el).should("not.contain", "head");
      }
    });
    cy.get("@firstAddedElement").get("[class*=circle_modified]");
  });

  it("should add elem to the tail of the list correctly", () => {
    cy.get("input[name=inputValueStr]").type("3");
    cy.get("button[name=add-button][value=tail]").click();

    cy.get("[data-testid=circle]").as("circles");
    cy.get("@circles").contains("3").get("[class*=circle_changing]");
    cy.get("@circles").contains("0").get("[class*=circle_changing]");

    cy.wait(1000);
    cy.get("@circles").each(($el, index) => {
      if (index === 4) {
        cy.wrap($el).should("contain", "3");
        cy.wrap($el).should("contain", "tail");
        cy.wrap($el).get("[class*=circle_modified]");
      }
      if (index === 3) {
        cy.wrap($el).should("contain", "0");
        cy.wrap($el).should("not.contain", "tail");
        cy.wrap($el).get("[class*=circle_default]");
      }
    });
    cy.wait(500);
    cy.get("@circles").get("[class*=circle_default]");
  });

  it("should add elem by the index to the list correctly", () => {
    cy.get("input[name=inputValueStr]").type("3");
    cy.get("input[name=inputValueNum]").type("1");
    cy.get("button[name=add-index-button]").click();

    cy.get("[data-testid=circle]").as("circles");

    cy.get("@circles").contains("8").get("[class*=circle_default]");
    cy.get("@circles").contains("3").get("[class*=circle_changing]");
    cy.get("@circles").contains("1").get("[class*=circle_changing]");

    cy.wait(500);
    cy.get("@circles").contains("8").get("[class*=circle_changing]");
    cy.wait(500);
    cy.get("@circles").contains("3").get("[class*=circle_modified]");

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
    cy.get("input[name=inputValueNum]").type("1");
    cy.get("button[name=delete-index-button]").click();

    cy.get("[data-testid=circle]").as("circles");
    cy.get("[data-testid=circle-tail]").as("smallCircles");

    cy.get("@smallCircles").contains("8").get("[class*=circle_changing]");
    cy.get("@circles").contains("1").get("[class*=circle_changing]");
    cy.get("@circles").contains("8").get("[class*=circle_default]");

    cy.wait(1000);

    cy.get("@circles").each(($el, index) => {
      if (index === 1) {
        cy.wrap($el).should("have.value", "");
        cy.wrap($el).get("[class*=circle_changing]");
      }

      if (index === 0) {
        cy.wrap($el).get("[class*=circle_changing]");
      }
    });
    cy.wait(1500);
    cy.get("@circles").get("[class*=circle_default]");
  });

  it("should delete elem from the head of the list correctly", () => {
    cy.get("[data-testid=circle]").as("circles");
    cy.get("[data-testid=circle-tail]").as("smallCircles");

    cy.get("@circles").first().as("headElem");
    cy.get("@headElem").contains("1");
    cy.get("@headElem").contains("head");
    cy.get("@headElem").get("[class*=circle_default]");

    cy.get("button[name=delete-button][value=head]").click();

    cy.get("@headElem").should("have.value", "");
    cy.get("@headElem").get("[class*=circle_changing]");
    cy.get("@smallCircles").contains("1").get("[class*=circle_changing]");

    cy.wait(1000);

    cy.get("@headElem").contains("8");
    cy.get("@headElem").contains("head");
    cy.get("@headElem").get("[class*=circle_default]");
  });

  it("should delete elem from the tail of the list correctly", () => {
    cy.get("[data-testid=circle]").as("circles");
    cy.get("[data-testid=circle-tail]").as("smallCircles");

    cy.get("@circles").last().as("tailElem");
    cy.get("@tailElem").contains("0");
    cy.get("@tailElem").contains("tail");
    cy.get("@tailElem").get("[class*=circle_default]");

    cy.get("button[name=delete-button][value=tail]").click();
    cy.get("@tailElem").get("[class*=circle_changing]");
    cy.get("@tailElem").should("have.value", "");
    cy.get("@smallCircles").contains("0").get("[class*=circle_changing]");

    cy.wait(1000);

    cy.get("@tailElem").contains("34");
    cy.get("@tailElem").contains("tail");
    cy.get("@tailElem").get("[class*=circle_default]");
  });
});
