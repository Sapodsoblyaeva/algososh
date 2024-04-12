describe("string reverse", () => {
  it("should have disabled button if input is empty", () => {
    cy.visit("http://localhost:3000/recursion");

    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");

    cy.get("input").type("cypress");
    cy.get("button").should("not.be.disabled");
  });

  it("should reverse the string correctly and with animation", () => {
    cy.visit("http://localhost:3000/recursion");

    cy.get("input").type("pina");
    cy.get("button").contains("Развернуть").click();

    cy.get("[class*=circle_content]").get("[class*=circle_default]");
    cy.get("[class*=circle_content]").filter(":nth-child(1)").contains("p");
    cy.get("[class*=circle_content]").filter(":nth-child(2)").contains("i");
    cy.get("[class*=circle_content]").filter(":nth-child(3)").contains("n");
    cy.get("[class*=circle_content]").filter(":nth-child(4)").contains("a");

    cy.wait(500);
    cy.get("[class*=circle_content]")
      .filter(":nth-child(1)")
      .contains("p")
      .get("[class*=circle_changing]");
    cy.get("[class*=circle_content]")
      .filter(":nth-child(2)")
      .contains("i")
      .get("[class*=circle_default]");
    cy.get("[class*=circle_content]")
      .filter(":nth-child(3)")
      .contains("n")
      .get("[class*=circle_default]");
    cy.get("[class*=circle_content]")
      .filter(":nth-child(4)")
      .contains("a")
      .get("[class*=circle_changing]");

    cy.wait(500);
    cy.get("[class*=circle_content]")
      .filter(":nth-child(4)")
      .contains("p")
      .get("[class*=circle_modified]");
    cy.get("[class*=circle_content]")
      .filter(":nth-child(1)")
      .contains("a")
      .get("[class*=circle_modified]");
    cy.get("[class*=circle_content]")
      .filter(":nth-child(2)")
      .contains("i")
      .get("[class*=circle_changing]");
    cy.get("[class*=circle_content]")
      .filter(":nth-child(3)")
      .contains("n")
      .get("[class*=circle_changing]");

    cy.wait(500);
    cy.get("[class*=circle_content]")
      .filter(":nth-child(2)")
      .contains("n")
      .get("[class*=circle_modified]");
    cy.get("[class*=circle_content]")
      .filter(":nth-child(3)")
      .contains("i")
      .get("[class*=circle_modified]");

    cy.wait(500);
    cy.get("[class*=circle_content]").get("[class*=circle_modified]");
    cy.get("[class*=circle_content]").filter(":nth-child(1)").contains("a");
    cy.get("[class*=circle_content]").filter(":nth-child(2)").contains("n");
    cy.get("[class*=circle_content]").filter(":nth-child(3)").contains("i");
    cy.get("[class*=circle_content]").filter(":nth-child(4)").contains("p");
  });
});
