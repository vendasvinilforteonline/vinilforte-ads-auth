# VINILFORTE · retorno de autorização Shopee

Página estática para o retorno da autorização das próprias lojas. Não é o gestor completo nem um servidor de autenticação. A integração da API e a troca do código por tokens no serviço local ainda precisam ser implementadas.

## Publicação gratuita

Em Settings → Pages, selecione Deploy from a branch, branch `main`, pasta `/ (root)` e Save. Aguarde o deploy ficar concluído.

URL prevista da página: `https://vendasvinilforteonline.github.io/vinilforte-ads-auth/`

Domínio previsto no campo Live Redirect URL Domain: `https://vendasvinilforteonline.github.io`

Use a URL completa como `redirect` ao gerar a autorização, preservando o mesmo domínio cadastrado. A disponibilidade do site e a aceitação pela Shopee devem ser verificadas após a publicação. A página não comprova aprovação de produção ou autorização de loja.

## Comportamento

- Acesso normal mostra uma explicação do retorno.
- Recebe `code` e `shop_id`; preserva `state` quando fornecido, sem o considerar validado.
- Remove query e fragmento do endereço antes de renderizar. O provedor de hospedagem recebe a requisição inicial e pode registrá-la; a limpeza do endereço não altera os registros da hospedagem.
- Usa apenas memória temporária; não usa cookies, localStorage, sessionStorage, analytics ou chamadas de rede por JavaScript.
- O botão de copiar exige ação explícita do usuário. Limpar ou fechar a tela descarta o retorno da memória utilizável; a área de transferência não é apagada automaticamente.
- Após cinco minutos, o retorno é descartado desta tela. Esse prazo é somente uma limpeza da interface, não uma declaração da validade do código na API.
- Não faz redirecionamentos externos ou automáticos para localhost, não recebe senha e não troca códigos por tokens.

## Integração pendente no gestor

Antes de permitir conectar uma loja, implementar no serviço local: início vinculado à sessão do usuário com nonce aleatório; validação da tentativa retornada com uso único e expiração; troca de código assinada conforme a documentação oficial Shopee; cofre para Partner Key e tokens; confirmação da loja autorizada e renovação de tokens. Os dados retornados por esta página são entrada não confiável e não comprovam autenticidade por si sós.

Nunca publicar Partner Key, senha, tokens, dados de clientes ou códigos reais neste repositório. Usar somente dados fictícios nos testes. A página não concede acesso aos dados da loja e não altera anúncios.
