/// <reference types="cypress" />
import { internet } from "faker";

describe("Testes da Funcionalidade Usuários", () => {
  it("Deve validar contrato de usuários", () => {
    cy.request("GET", "/usuarios").its("status").should("equal", 200);
  });

  it("Deve listar usuários cadastrados", () => {
    cy.request("GET", "/usuarios").its("status").should("equal", 200);
  });

  it("Deve cadastrar um usuário com sucesso", () => {
    const novoEmail = internet.email();

    cy.cadastrarUsuario({
      nome: "Matheus Sena Aguiar",
      email: novoEmail,
      password: "teste",
      administrador: "true",
    }).then((usuarioId) => {
      Cypress.env("usuarioId", usuarioId);
    });
  });

  it("Deve validar um usuário com email inválido", () => {
    const invalidEmail = "invalidemail";

    cy.request({
      method: "POST",
      url: "/usuarios",
      failOnStatusCode: false,
      body: {
        name: "Matheus Neves dos Santos",
        email: invalidEmail,
        password: "senha123",
      },
    }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });

  it("Deve editar um usuário previamente cadastrado", () => {
    const usuarioId = Cypress.env("usuarioId");
    const novoEmail = internet.email();

    const updatedUserData = {
      nome: "Matheus Sena Aguiar",
      email: novoEmail,
      password: "teste",
      administrador: "true",
    };

    cy.request("PUT", `/usuarios/${usuarioId}`, updatedUserData)
      .its("status")
      .should("equal", 200);
  });

  it("Deve deletar um usuário previamente cadastrado", () => {
    const usuarioId = Cypress.env("usuarioId");

    cy.request("DELETE", `/usuarios/${usuarioId}`)
      .its("status")
      .should("equal", 200);
  });
});
