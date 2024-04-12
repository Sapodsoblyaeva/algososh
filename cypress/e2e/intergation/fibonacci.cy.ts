describe("fibonacci sequence", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });
  it("should have disabled button if input is empty", () => {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");

    cy.get("input").type("5");
    cy.get("button").should("not.be.disabled");
  });

  it("should display correct fibonacci sequence", () => {
    cy.get("input").type("5");
    cy.get("button").contains("Рассчитать").click();

    cy.wait(1000);
    cy.get("[class*=circle_content]").filter(":nth-child(1)").contains("1");
    cy.wait(1000);
    cy.get("[class*=circle_content]").filter(":nth-child(2)").contains("1");
    cy.wait(1000);
    cy.get("[class*=circle_content]").filter(":nth-child(3)").contains("2");
    cy.wait(1000);
    cy.get("[class*=circle_content]").filter(":nth-child(4)").contains("3");
    cy.wait(1000);
    cy.get("[class*=circle_content]").filter(":nth-child(5)").contains("5");
    cy.wait(1000);
    cy.get("[class*=circle_content]").filter(":nth-child(6)").contains("8");
  });
});
