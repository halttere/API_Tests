Cypress.Commands.add("token", (email, senha) => {
  const id = cy
    .request({
      method: "POST",
      url: "login",
      body: {
        email: email,
        password: senha,
      },
    })
    .then((response) => {
      expect(response.status).to.equal(200);
      return response.body.authorization;
    });
});

Cypress.Commands.add(
  "cadastrarProduto",
  (token, produto, preco, descricao, quantidade) => {
    cy.request({
      method: "POST",
      url: "produtos",
      headers: { authorization: token },
      body: {
        nome: produto,
        preco: preco,
        descricao: descricao,
        quantidade: quantidade,
      },
      failOnStatusCode: false,
    });
  }
);

Cypress.Commands.add("cadastrarUsuario", (usuario) => {
  return cy
    .request({
      method: "POST",
      url: "/usuarios",
      body: usuario,
    })
    .then((response) => {
      expect(response.status).to.equal(201);
      return response.body._id; // Retornar o ID do usuário criado
    });
});
