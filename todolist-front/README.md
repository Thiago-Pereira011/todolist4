# todo. — Frontend

Frontend do TODOLIST em **React + Vite**, consumindo a API Fastify/MySQL (`todolist-back`).

## Como rodar

```bash
npm install
cp .env.example .env     # e coloque a URL do seu backend hospedado em VITE_API_URL
npm run dev              # http://localhost:5173
```

## Funcionalidades

- Listagem com contadores **Tasks** (total) e **Done** (concluídas)
- Criar tarefa (modal "Create Task") com data limite opcional
- Editar tarefa (modal "Edit Task") pelo botão de lápis
- Excluir tarefa (lixeira) — editar/excluir aparecem ao passar o mouse
- Marcar/desmarcar como concluída (checkbox com gradiente)
- Busca em tempo real com debounce de 400 ms
- Ordenação: data mais próxima primeiro, sem data por último
- Tarefa pendente com data vencida: título vermelho + selo "Em atraso"
- Estado vazio "You have no pending tasks." e botão flutuante "+"

## Estrutura

```
src/
  api.js                 chamadas ao backend (GET/POST/PATCH/DELETE /api/tasks)
  dates.js               formatação, atraso e ordenação
  hooks/useDebounce.js   debounce da busca
  components/            TaskItem, TaskModal, Icons
  App.jsx / styles.css
```
