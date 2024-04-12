describe("queue", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
  });

  it("should have disabled button if input is empty", () => {
    cy.get("input").should("have.value", "");
    cy.get("button[value=Добавить]").should("be.disabled");
    cy.get("button[value=Удалить]").should("be.disabled");
    cy.get("button[value=Очистить]").should("be.disabled");

    cy.get("input").type("5");
    cy.get("button[value=Добавить]").should("not.be.disabled");
    cy.get("button[value=Добавить]").click();

    cy.wait(1000);
    cy.get("button[value=Удалить]").should("not.be.disabled");
    cy.get("button[value=Очистить]").should("not.be.disabled");

    cy.wait(1000);
    cy.get("button[value=Добавить]").should("be.disabled");
  });

  it("should add data to the queue correctly", () => {
    cy.get("input").type("5");
    cy.get("button[value=Добавить]").click();

    cy.wait(500);
    cy.get("[class*=circle_content]")
      .filter(":nth-child(1)")
      .as("firstAddedElement");
    cy.get("@firstAddedElement").contains("5");
    cy.get("@firstAddedElement").contains("head");
    cy.get("@firstAddedElement").contains("tail");
    cy.get("@firstAddedElement").get("[class*=circle_changing]");

    cy.wait(500);
    cy.get("@firstAddedElement").get("[class*=circle_default]");

    cy.get("input").type("34");
    cy.get("button[value=Добавить]").click();

    cy.wait(500);
    cy.get("[class*=circle_content]")
      .filter(":nth-child(2)")
      .as("secondAddedElement");
    cy.get("@secondAddedElement").contains("34");
    cy.get("@secondAddedElement").contains("tail");
    cy.get("@secondAddedElement").should("not.contain", "head");
    cy.get("@secondAddedElement").get("[class*=circle_changing]");
    cy.get("@firstAddedElement").contains("5");
    cy.get("@firstAddedElement").should("not.contain", "tail");
    cy.get("@firstAddedElement").contains("head");
    cy.get("@firstAddedElement").get("[class*=circle_default]");

    cy.wait(500);
    cy.get("@secondAddedElement").get("[class*=circle_default]");

    cy.get("input").type("75");
    cy.get("button[value=Добавить]").click();

    cy.wait(500);
    cy.get("[class*=circle_content]")
      .filter(":nth-child(3)")
      .as("thirdAddedElement");
    cy.get("@thirdAddedElement").contains("75");
    cy.get("@thirdAddedElement").contains("tail");
    cy.get("@thirdAddedElement").should("not.contain", "head");
    cy.get("@thirdAddedElement").get("[class*=circle_changing]");
    cy.get("@secondAddedElement").should("not.contain", "tail");

    cy.wait(500);
    cy.get("@thirdAddedElement").get("[class*=circle_default]");
  });

  it("should add data to the queue correctly", () => {
    cy.get("input").type("5");
    cy.get("button[value=Добавить]").click();

    cy.wait(500);
    cy.get("input").type("34");
    cy.get("button[value=Добавить]").click();

    cy.wait(500);
    cy.get("input").type("75");
    cy.get("button[value=Добавить]").click();

    cy.wait(500);

    cy.get("button[value=Удалить]").click();
    cy.get("[class*=circle_content]")
      .filter(":nth-child(1)")
      .as("firstAddedElement");
    cy.get("@firstAddedElement").get("[class*=circle_changing]");

    cy.wait(500);
    cy.get("@firstAddedElement").should("have.value", "");
    cy.get("[class*=circle_content]").filter(":nth-child(2)").contains("head");
    cy.get("[class*=circle_content]").filter(":nth-child(3)").contains("tail");
  });

  it("should clear all data in the queue correctly", () => {
    cy.get("input").type("5");
    cy.get("button[value=Добавить]").click();
    cy.wait(500);
    cy.get("input").type("34");
    cy.get("button[value=Добавить]").click();

    cy.wait(500);
    cy.get("button[value=Очистить]").click();

    cy.get("[class*=circle_content]").should("have.length", "7");
    cy.get("[class*=circle_content]").should("have.value", "");
  });
});
