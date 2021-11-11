import { utilService } from "./util-service.js"
import { storageService } from './async-storage-service.js';

var emails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',
        isRead: true,
        sentAt: Date.now(),
        to: 'momo@momo.com',
        from: 'momo@momo.com',
        isSelected: false
    },
    {
        id: 'e102',
        subject: 'Hello!',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',
        isRead: true,
        sentAt: new Date(2018, 12, 17),
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
    {
        id: 'e103',
        subject: 'chcah',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',

        isRead: false,
        sentAt: new Date(2019, 6, 2),
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
    {
        id: 'e104',
        subject: 'bkabka',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: new Date(2020, 8, 5),
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
    {
        id: 'e105',
        subject: 'lalala',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',

        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
    {
        id: 'e106',
        subject: 'Call me',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',
        isRead: false,
        sentAt: new Date(2020, 4, 10),
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
    {
        id: 'e107',
        subject: 'Hi there',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',
        isRead: false,
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
    {
        id: 'e108',
        subject: 'Hi there',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda quibusdam repellat iure fugiat non qui consequatur optio cumque. Delectus error natus fugit harum. Neque incidunt iusto atque suscipit et eos',
        isRead: false,
        sentAt: Date.now(),
        to: 'momo@momo.com',
        from: 'lala@lolo.com',
        isSelected: false
    },
]

const loggedinUser = {
    email: 'momo@momo.com',
    fullname: 'Mahatma Appsus'
}

utilService.saveToStorage('emails', emails)
const KEY = 'emails'

export const emailService = {
    query,
    remove,
    save,
    getById,
    getNextemailId,
    getEmailType,
    getEmptyMail
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
    return { inbox, sent }
}
function getEmptyMail() {
    return {
        id: '',
        title: '',
        from: loggedinUser.email,
        to:'',
        subject: '',
        body: '',
        sentAt: '',
        isSelected: false
    };
}