# Projeto Valoriza - Next Level Week

Este projeto tem como objetivo valorizar o trabalho de outras pessoas fazendo elogios.

Funcionalidades:
- [ ] Cadastro de usuários

- [ ] Cadatro de Tags(elogios possíveis)
obs: Somente usuários administrativos

- [ ] Cadastro de elogios. Campos: ID do usuário, ID da tag e data de criação.

- [ ] Autenticação de usuário
- [ ] Gerar token  JWT
- [ ] Validar usuário logado nas rotas necessárias

- [ ] Listagem de usuários
- [ ] Listagem de tags
- [ ] Listagem de elogios por usuário

## Regras

- Cadastro de usuário

    [x] Não é permitido cadastrar mais de um usuário com o mesmo e-mail

    [x] Não é permitido cadastrar usuário sem e-mail

- Cadastro de TAG

    [x] Não é permitido cadastrar mais de uma tag com o mesmo nome

    [x] Não é permitido cadastrar tag sem nome

    [x] Não é permitido o cadastro por usuários que não sejam administradores

- Cadastro de elogios

    [ ] Não é permitido um usuário cadastrar um elogio para si

    [ ] Não é permitido cadastrar elogios para usuários inválidos

    [ ] O usuário precisa estar autenticado na aplicação

