# 🎂 Cakes by Jack — Sistema de Gestão da Confeitaria

Sistema completo de gestão para a confeitaria **Cakes by Jack**, desenvolvido por
**Nova Nexo**. Frontend em TanStack Start + React 19 + Tailwind 4 e backend
totalmente baseado em **Google Sheets** como fonte única da verdade.

---

## ✨ Visão geral

| Módulo            | Função                                              |
| ----------------- | --------------------------------------------------- |
| Painel Financeiro | KPIs, faturamento mensal, próximas entregas        |
| Catálogo          | Catálogo público para clientes fazerem pedidos     |
| Pedidos           | Gestão completa, status, pagamentos                 |
| Agenda            | Calendário (desktop) / lista cronológica (mobile)  |
| Financeiro        | Recebimentos, saldos e situação dos pedidos        |
| Configurações     | Dados da confeitaria, Pix, WhatsApp                |
| Admin Nexo        | CRUD de usuários e permissões (apenas ADMIN)       |

Perfis disponíveis: **ADMIN** (controle total), **OWNER** (Jack), **CLIENTE**.

---

## 🚀 Rodar localmente (VS Code)

### Pré-requisitos
- [Bun](https://bun.sh) ≥ 1.1 (ou Node 20+ com npm/pnpm)
- Conta Google com acesso à planilha

### Passos
```bash
git clone <seu-repo>
cd cakes-by-jack
bun install        # ou npm install
cp .env.example .env
# preencha as variáveis (veja seção abaixo)
bun run dev        # http://localhost:8080
```

---

## 🔑 Variáveis de ambiente (`.env`)

```env
# Google Sheets (fonte única da verdade)
VITE_SHEETS_ID="1NYQBaQ9JXnLxm6Gj9z6wqnagHBZadZRx3_VFCXKFCq0"
GOOGLE_SHEETS_API_KEY="sua-chave-do-Google-Sheets-API"
GOOGLE_SERVICE_ACCOUNT_EMAIL="conta@projeto.iam.gserviceaccount.com"
GOOGLE_SERVICE_ACCOUNT_KEY="-----BEGIN PRIVATE KEY-----\n..."

# Storage de imagens do catálogo (opcional — pode ser substituído por S3/R2/Vercel Blob)
SUPABASE_URL="https://xxxx.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="..."
```

> Dentro do ambiente Lovable, essas variáveis são fornecidas automaticamente
> pelos conectores. Fora do Lovable você deve criar uma **Service Account**
> no Google Cloud Console, dar acesso de **Editor** à planilha e usar a chave
> JSON para autenticar.

---

## 📊 Estrutura da planilha (Google Sheets)

Planilha: <https://docs.google.com/spreadsheets/d/1NYQBaQ9JXnLxm6Gj9z6wqnagHBZadZRx3_VFCXKFCq0/edit>

Abas obrigatórias com cabeçalhos exatos:

| Aba             | Cabeçalhos                                                                                                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Configuracoes` | `Campo` \| `Valor`                                                                                                                                                                                  |
| `Usuarios`      | `ID Usuario` \| `Nome` \| `WhatsApp` \| `Perfil` \| `Status` \| `Observacoes`                                                                                                                       |
| `Clientes`      | `ID Cliente` \| `Nome` \| `WhatsApp` \| `Endereco` \| `Observacoes`                                                                                                                                 |
| `Produtos`      | `ID Produto` \| `Categoria` \| `Produto` \| `Descricao` \| `Preco` \| `Imagem` \| `Ativo`                                                                                                            |
| `Pedidos`       | `ID Pedido` \| `Data Pedido` \| `ID Cliente` \| `Cliente` \| `WhatsApp` \| `Produto` \| `Quantidade` \| `Valor Unitario` \| `Valor Total` \| `Status` \| `Data Entrega` \| `Hora Entrega` \| `Valor Entrada` \| `Valor Pago` \| `Saldo Restante` \| `Situacao Financeira` \| `Forma Pagamento` \| `Observacoes` |
| `Pagamentos`    | `ID Pagamento` \| `ID Pedido` \| `Data` \| `Valor` \| `Forma Pagamento` \| `Observacao`                                                                                                              |

---

## 🌐 Publicar no Netlify

1. **Ajustar build target** em `vite.config.ts`:
   ```ts
   tanstackStart: {
     target: "netlify",   // troca o preset Nitro de cloudflare para netlify
     server: { entry: "server" },
   }
   ```
2. **Configurar variáveis** no painel Netlify → *Site settings → Environment variables*  
   (use as mesmas chaves do `.env`).
3. **Build & deploy** — o `netlify.toml` já está configurado:
   ```bash
   bun run build
   # ou faça push para o branch conectado ao Netlify
   ```
4. **Domínio personalizado** — opcional, configure em *Domain settings*.

---

## 🛠️ Tarefas administrativas comuns

### Alterar chave Pix
1. Acesse **Configurações** no menu.
2. Edite "Chave Pix", "Tipo da chave", "Nome do recebedor" e "Banco".
3. Clique em **Salvar configurações** — os valores são gravados na aba
   `Configuracoes` da planilha.

### Alterar WhatsApp principal
Mesmo fluxo de Configurações — campo "WhatsApp principal".

### Trocar a logo
Substitua o arquivo `src/assets/cakes-by-jack-logo.png.asset.json` apontando
para a nova URL/asset, e atualize o `<link rel="icon">` em
`src/routes/__root.tsx` se necessário.

### Cadastrar / editar usuários
- Apenas usuários **ADMIN** veem o menu **Admin Nexo**.
- Cadastre novos usuários informando: Nome, WhatsApp (somente números, com DDD),
  Perfil (`ADMIN` / `OWNER` / `CLIENTE`) e Status.
- O WhatsApp é a credencial de login.

### Trocar o OWNER
Edite o usuário OWNER atual (em **Admin Nexo**) e ajuste o perfil.
Ou cadastre um novo OWNER e bloqueie o anterior.

---

## ✅ Relatório de independência

Auditoria realizada antes da entrega:

- ✓ Pedidos, clientes, usuários, pagamentos, configurações: **100% em Google Sheets**
- ✓ `localStorage` usado **somente para sessão** (token de login)
- ✓ Sem `mock`, sem `seed`, sem cache de dados de negócio
- ✓ Lovable Cloud é usado **apenas para armazenamento de imagens** (substituível)
- ✓ Build pronto para **Netlify** (ajustando preset Nitro)
- ✓ Pode rodar fora do Lovable em qualquer servidor com suporte a Node 20+

---

## 📦 Pacote completo

Um ZIP completo do código-fonte (sem `node_modules` e `.git`) está disponível
em `cakes-by-jack-export.zip` no diretório `/mnt/documents/` desta sessão.

---

Sistema desenvolvido por **Nova Nexo** · 2026
