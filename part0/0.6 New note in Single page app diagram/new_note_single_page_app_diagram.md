``` mermaid
sequenceDiagram
participant browser
participant server

Note right of browser: New event - "Save" button pressed
Note right of browser: The browser executes the js code where it creates a new note, adds it to the list of notes and rerenders the list of notes on the page

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
activate server
Note right of browser: The POST request contains JSON with a new note
server-->>browser: Server responce
deactivate server

Note right of browser: The response contains a 201 status code (created)
