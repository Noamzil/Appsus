import { utilService } from "./util-service.js"
import { storageService } from './async-storage-service.js';

var emails = [
    {
        id: 'e101',
        subject: 'Miss you Babe!',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',
        isRead: false,
        sentAt: new Date(2020, 6, 2), 
        to: 'momo@momo.com',
        from: 'momo@momo.com',
        senderName: 'Kim Kardashian',
        senderImg: true,
        isStarred: true
    },
    {
        id: 'e102',
        subject: 'Coming for lunch?',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',
        isRead: false,
        sentAt: new Date(2019, 0, 17),
        to: 'momo@momo.com',
        from: 'momo@momo.com',
        senderName: 'Gordon Ramsay',
        senderImg: true,
        isStarred: true
    },
    {
        id: 'e103',
        subject: 'Vue Data',
        body: 'Remember! Data is a function that returns an object!    Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit',
        isRead: true,
        sentAt: new Date(2020, 9, 1),
        to: 'momo@momo.com',
        from: 'ori@momo.com',
        senderName: 'Ori Shemla',
        senderImg: false,
        isStarred: false
    },
    {
        id: 'e104',
        subject: 'Karaoke night?',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',
        isRead: false,
        sentAt: new Date(2020, 1, 23),
        to: 'momo@momo.com',
        from: 'momo@momo.com',
        senderName: 'Ed Sheeran',
        senderImg: true,
        isStarred: false
    },
    {
        id: 'e105',
        subject: 'Gotta tell you something! ',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',
        isRead: true,
        sentAt: Date.now(),
        to: 'momo@momo.com',
        from: 'momo@momo.com',
        senderName: 'Gal Gadot',
        senderImg: true,
        isStarred: true
    },
    {
        id: 'e106',
        subject: 'I\'m FREE baby!!',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',
        isRead: false,
        sentAt: new Date(2020, 8, 5),
        to: 'momo@momo.com',
        from: 'momo@momo.com',
        senderName: 'Britney Spears',
        senderImg: true,
        isStarred: false
    },
    {
        id: 'e107',
        subject: 'Hi there!',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',
        isRead: true,
        sentAt: new Date(2020, 10, 2),
        to: 'momo@momo.com',
        from: 'momo@momo.com',
        senderName: 'Noa Kirel',
        senderImg: true,
        isStarred: false
    },
    {
        id: 'e108',
        subject: 'Sprint 3 tasks ',
        body: 'It\'s so simple and easy! Should take 3 to 6 hours.',
        isRead: true,
        sentAt: new Date(2020, 3, 2),
        to: 'momo@momo.com',
        from: 'yaron@momo.com',
        senderName: 'Yaron Biton',
        senderImg: false,
        isStarred: false
    },
    {
        id: 'e109',
        subject: 'Going out Tonight??',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',
        isRead: true,
        sentAt: new Date(2020, 5, 28),
        to: 'momo@momo.com',
        from: 'momo@momo.com',
        senderName: 'Beyonce',
        senderImg: true,
        isStarred: true
    },

]

const loggedinUser = {
    email: 'momo@momo.com',
    fullname: 'Mahatma Appsus'
}
var trashEmails = [{
    id: 'e105',
    subject: 'lalala',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',

    isRead: false,
    sentAt: 1551133930594,
    to: 'momo@momo.com',
    from: 'kikiki@lolo.com',
    isStarred: false
}]
var drafts = []
var starredEmails = []
utilService.saveToStorage('emails', emails)
utilService.saveToStorage('trash', trashEmails)
const KEY = 'emails'

export const emailService = {
    query,
    remove,
    save,
    getById,
    getNextemailId,
    getEmailType,
    getEmptyMail,
    saveToTrash,
    starEmail,
    saveDrafts
}

function query(filterBy = {}) {
    return storageService.query(KEY)
        .then(emails => {
            if (filterBy.topemails) {
                emails = emails.slice(0, 2);
            }
            return emails;
        });
}
function remove(emailId) {
    return storageService.remove(KEY, emailId);
}
function save(email) {
    if (email.id) return storageService.put(KEY, email);
    else return storageService.post(KEY, email);
}
function getById(emailId) {
    return storageService.get(KEY, emailId);
}
function getNextemailId(emailId) {
    return query()
        .then(emails => {
            const idx = emails.findIndex(email => email.id === emailId);
            return (idx === emails.length - 1) ? emails[0].id : emails[idx + 1].id;
        });
}
function getEmailType(emails) {
    var inbox = emails.filter(email => {
        return email.to === loggedinUser.email
    })
    var sent = emails.filter(email => {
        return email.from === loggedinUser.email
    })
    var trash = utilService.loadFromStorage('trash')
    return { inbox, sent, trash }

}
function getEmptyMail() {
    return {
        id: utilService.makeId(),
        title: '',
        from: loggedinUser.email,
        to: '',
        subject: '',
        body: '',
        sentAt: '',
        isStarred: false
    };
}

function saveToTrash(email) {
    return storageService.post('trash', email);
}
function starEmail(email) {
    return storageService.post('starred', email);
}

function saveDrafts(newEmail) {
    var draftIdx = drafts.findIndex(draft => draft.id === newEmail.id)
    if (draftIdx === -1) drafts.push(newEmail)
    else drafts[draftIdx] = newEmail
    utilService.saveToStorage('drafts', drafts)
}