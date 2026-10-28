# Retorno Mercado Livre

URI a cadastrar e reutilizar exatamente no OAuth:
`https://vendasvinilforteonline.github.io/vinilforte-ads-auth/mercadolivre/`

Página estática sem Client Secret, verificador PKCE ou tokens. Recebe code e state, limpa a URL e permite copiar o retorno por ação do usuário. Não troca tokens nem comprova autenticidade. O serviço local ainda deve implementar estado aleatório vinculado à sessão, uso único, expiração, PKCE S256 e validação da conta. O código e state são entrada não confiável; apenas o servidor local pode validar a tentativa. Nenhuma integração ou autorização de loja é concluída aqui.

Habilitar Authorization Code, Refresh Token e PKCE. Client Credentials não é necessário para gerenciar a conta do vendedor. O callback Shopee e os arquivos existentes na raiz permanecem independentes.
