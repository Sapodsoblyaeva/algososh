describe("routing is working", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should be routed to string recursion page", () => {
    cy.get('[data-testid="recursion-card"]').click();
    cy.contains("Строка");
  });

  it("should be routed to string recursion page", () => {
    cy.get('[data-testid="fibonacci-card"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("should be routed to string recursion page", () => {
    cy.get('[data-testid="sorting-card"]').click();
    cy.contains("Сортировка массива");
  });

  it("should be routed to string recursion page", () => {
    cy.get('[data-testid="stack-card"]').click();
    cy.contains("Стек");
  });

  it("should be routed to string recursion page", () => {
    cy.get('[data-testid="queue-card"]').click();
    cy.contains("Очередь");
  });

  it("should be routed to string recursion page", () => {
    cy.get('[data-testid="list-card"]').click();
    cy.contains("Связный список");
  });
});
