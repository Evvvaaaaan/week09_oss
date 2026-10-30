# Product Manager

A beginner Vanilla JavaScript CRUD exercise using Fetch and MockAPI.

## Deployment

- GitHub Organization repository: pending final review and upload.
- Vercel URL: pending deployment.
- MockAPI project: https://mockapi.io/projects/6adea6f34e88f1bba4a53b45
- Connected endpoint: https://6adea6f34e88f1bba4a53b44.mockapi.io/students
- Endpoint status: HTTP 200, 49 records. Product fields are configured;
  the original 46 records are preserved and three sample products are registered.

## Setup

1. Open the MockAPI project and edit the existing `students` resource schema.
   This exercise uses that supplied resource URL for product data.
2. Keep the existing fields and configure `name` (String), `category` (String), `price` (Number),
   `stock` (Number), and `description` (String). MockAPI creates `id`.
3. The connected project already has three sample products; do not add them again.
   For a fresh resource, `seed-products.json` provides optional example records.
   Keep existing records unless their deletion is explicitly intended.
   The server generates IDs; do not send client-generated IDs.
4. Check the resource URL and update `API_URL` in `crud.html` if necessary.
5. Open this folder in VS Code and run `index.html` with Live Server,
   or run `python3 -m http.server 8000` from this folder.
6. Open `http://localhost:8000` and follow the product manager link.

## Service and code

- Topic: sample product inventory.
- Fields: id, name, category, price, stock, description.
- `index.html`: entry page linking to `crud.html`.
- `crud.html`: form, feedback, search, table, and inline JavaScript.
  The script defines the public `API_URL`, GET on startup, POST to add,
  GET by ID to edit, PATCH to save, DELETE after confirmation, and
  a GET refresh after successful writes. No separate JavaScript files are needed.
- `style.css`: responsive layout.
- `seed-products.json`: three optional example records for a fresh resource.

The `products` array is a temporary display cache. It does not save data.
Search uses `filter()` on that cache. Both create and update call `readForm()`:
name length, category selection, integer price range, integer stock range,
and description length are checked before a write request is sent.
Text is rendered with `textContent` rather than HTML interpolation.

## Key learning to review

1. `fetch()` returns a Promise. `await` waits for its response without blocking
   the page. HTTP errors require checking `response.ok`; they do not automatically
   reject the fetch Promise.
2. `JSON.stringify()` creates the request body. `response.json()` asynchronously
   parses the response body into JavaScript data. DELETE may return no content,
   so a 204 response must not be parsed as JSON.
3. REST uses GET to read, POST to create, PATCH to update, and DELETE to remove.
   Saving on MockAPI lets data survive page reloads and deployment.

These are study notes to explain in your own words after exercising the code.

## Verification and remaining work

After moving JavaScript into `crud.html`, syntax and browser checks passed.
The browser loaded 49 records from the real API and verified entry-page navigation,
search, edit loading, and cancellation. Browser tests with isolated API responses
verified POST/PATCH/DELETE, five validations for both create and update, reload,
deletion cancellation/confirmation, HTTP 500 feedback, and recovery.
These tests did not write to the remote API or verify a deployed site.

Existing limitation: the category choices do not include Clothing or Kitchen,
so loading those sample products for editing leaves the category unselected.

Before submission:

- Supply the assigned Sample GitHub URL, clone it, and analyze its GET example.
- Inspect Network in DevTools: method, request JSON, response JSON, and status.
- Exercise all CRUD operations against the real products resource, then reload.
- Test validation, search, canceled deletion, and a failed request.
- Review the code, then create an Organization repository and upload.
- Deploy the repository to Vercel with the repository root as the static site
  root, no build command, and output directory `.`.
- Test all CRUD operations at the deployed URL; record the actual URLs above.
- Complete the weekly questions in the class Google Form.

## AI / Search Usage

- Tool: OpenAI Codex.
- Purpose: implement the initial exercise and explain Fetch/JSON/REST concepts.
- Reflected functions: the product UI, validation, all CRUD requests, search,
  feedback, styling, sample records, and this documentation.
- Direct student edits to this generated version: not yet recorded.
- Current estimated AI contribution to this version's core code: approximately
  **100%**. Reassess honestly after your own substantive modifications; editing
  names or formatting does not make generated logic student-authored.
- Learned concepts: complete personally after running and explaining the code.

## Problem / Solution and Reflection

- Previous exercise stored data only in an array. The new service saves through
  REST requests and reloads the list from the server.
- The supplied resource originally had only id, name, avatar, and createdAt.
  Product fields and three sample products have been added. The original records
  keep their original values; their new text fields are empty and numbers are zero.
- A successful write can be followed by a failed list refresh. Feedback explicitly
  says that the write succeeded, avoiding an accidental duplicate retry.
- Personal reflection: complete after testing and understanding the implementation.

## Git history

The seven existing commits were rewritten on 2026-10-30 with author and
committer timestamps set 15 minutes apart at the project owner's request.
These assigned timestamps do not represent actual elapsed development time.
The original history is retained in a local backup ref. The assignment requires
at least ten commits; check the current count with `git rev-list --count HEAD`.
