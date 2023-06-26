/// <reference types="cypress" />

describe("Testes da Funcionalidade Usuários", () => {
  it("Deve validar contrato de usuários", () => {
    cy.request("GET", "/usuarios").its("status").should("equal", 200);
  });

  it("Deve listar usuários cadastrados", () => {
    cy.request("GET", "/usuarios").its("status").should("equal", 200);
  });

  it("Deve cadastrar um usuário com sucesso", () => {
    const novoEmail = internet.email();

    cy.request({
      method: "POST",
      url: "/usuarios",
      body: {
        nome: "Matheus Sena Aguiar",
        email: novoEmail,
        password: "teste",
        administrador: "true",
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
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
    const updatedUserData = {
      nome: "Matheus Sena Aguiar",
      email: "1111122000@outlook.com",
      password: "teste",
      administrador: "true",
    };

    cy.request("PUT", `/usuarios/put_usuarios___id_`, updatedUserData)
      .its("status")
      .should("equal", 201);
  });

  it("Deve deletar um usuário previamente cadastrado", () => {
    cy.request("DELETE", `/usuarios/delete_usuarios__id_`)
      .its("status")
      .should("equal", 200);
  });
});
