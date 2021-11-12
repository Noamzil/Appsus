import homePage from "./pages/appsus-home-page.cmp.js";
import notesPage from "./pages/note-app.cmp.js";
import emailApp from "./pages/email-app.cmp.js";
import emailDetails from "./cmps-email/email-details.cmp.js";
import noteEdit from "./cmps-notes/note-edit.cmp.js";
import noteCreate from "./cmps-notes/note-create.cmp.js";
import { noteService } from "./services/note-service.js";

const routes = [
  {
    path: "/",
    component: homePage,
  },
  {
    path: "/note",
    name: 'note',
    component: notesPage,
  },
  {
    path: "/note/:noteId?/edit",
    component: noteEdit,
  },
  {
    path: "/note/:noteId?/new",
    component: noteCreate,
  },
  {
    path: "/email",
    component: emailApp,
  },
  {
    path: "/email/:emailId?",
    component: emailDetails,
  },
];

export const router = new VueRouter({ routes });
