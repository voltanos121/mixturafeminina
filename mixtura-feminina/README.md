# Loja Mixtura Feminina

## Estrutura
- `index.html`: loja e vitrine pública.
- `admin.html`: painel de administração.
- `css/style.css`: identidade visual e estilos responsivos.
- `js/app.js`: vitrine, filtros, WhatsApp e leitura das configurações.
- `js/admin.js`: login demonstrativo, cadastro/edição/exclusão e configurações.

## Como testar
1. Extraia a pasta e abra `index.html` em um navegador (é melhor testar com um servidor local).
2. Acesse `admin.html` para abrir o painel.
3. Senha inicial: `Mixtura@2026`.
4. No painel, cadastre/edite/exclua produtos e altere as informações da loja.

## Publicação na Vercel
Envie o conteúdo desta pasta para o repositório conectado à Vercel. Como é um site estático, não precisa de build command; deixe o diretório raiz como `./`.

## Atenção: armazenamento e segurança
Esta primeira versão salva alterações no `localStorage` do navegador. Portanto, os dados ficam apenas no navegador/dispositivo em que foram editados e não são sincronizados com os visitantes. A senha no JavaScript é apenas uma barreira demonstrativa e não protege um painel público contra acesso técnico. Para uso real em produção, conecte o painel a um banco como Supabase, configure autenticação e regras de acesso (RLS) no servidor. Não use dados reais sensíveis nesta versão demonstrativa.

As fotos dos produtos e editoriais são imagens ilustrativas carregadas do Unsplash pela internet. Os produtos e preços são fictícios e devem ser revisados antes de divulgar a loja.
