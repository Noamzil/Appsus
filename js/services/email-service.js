import { utilService } from "./util-service.js"
import { storageService } from './async-storage-service.js';

var gEmails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
    {
        id: 'e102',
        subject: 'Hello!',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
    {
        id: 'e103',
        subject: 'chcah',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
    {
        id: 'e104',
        subject: 'bkabka',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
    {
        id: 'e105',
        subject: 'lalala',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
    {
        id: 'e106',
        subject: 'Call me',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
    {
        id: 'e107',
        subject: 'Hi there',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
]

utilService.saveToStorage('emails', gEmails)
const KEY = 'email'

export const emailService = {
    query,
    remove,
    save,
    getById,
    getNextemailId
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



