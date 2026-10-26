// The landing page's words, German and English: one page of marketing copy, written as a whole.
// Names in the examples (Mathe, Lernen, ...) are sample content. The words people search for
// (Lernplaner, Fokus-Timer, Kalender, zusammen lernen, study planner, ...) sit in the
// description, the section headings and the questions, said the way a person would say them; the
// title is the plain line under the name ("dein Planer für Alltag und Studium").

// The app, where signing in, signing up and the legal pages live
export const APP_URL = (import.meta.env.PUBLIC_APP_URL || 'https://app.quidey.com').replace(/\/+$/, '');

const legal = (labels) => [
    [labels[0], `${APP_URL}/kontakt`],
    [labels[1], `${APP_URL}/impressum`],
    [labels[2], `${APP_URL}/datenschutz`],
    [labels[3], `${APP_URL}/nutzungsbedingungen`],
];

const de = {
    lang: 'de',
    path: '/',
    meta: {
        title: 'Quidey – dein Planer für Alltag und Studium',
        description: 'Lernplaner für Schule und Studium: Aufgaben, Fokus-Timer, Kalender und live mit Freunden lernen. Kostenlos in der Beta, ohne Werbung und ohne Tracking.',
        image: '/og/quidey-de.png',
        imageAlt: 'Quidey: Eine Sache nach der anderen. Lernplaner mit Fokus-Timer, Kalender und Lerngruppen.',
        // what the app does, for search engines (SoftwareApplication.featureList)
        featureList: [
            'Aufgaben- und To-do-Liste mit Gruppen, Farben und Prioritäten',
            'Fokus-Timer als Countdown oder Stoppuhr',
            'Kalender mit Monats-, Wochen- und Agenda-Ansicht',
            'Wiederkehrende Aufgaben und Termine, Erinnerungen per Mail',
            'Gemeinsame Lernsessions mit Freunden, live und mit Chat',
            'Lernstatistik, Serien, Level und tägliche Challenges',
            'Gemeinsamer Kalender für Familie, WG oder Lerngruppe',
            'Als App auf Handy und Rechner installierbar',
        ],
    },
    nav: { focus: 'Fokus', plan: 'Planen', together: 'Zusammen', more: 'Funktionen', faq: 'Fragen', label: 'Bereiche der Seite', signIn: 'Anmelden', cta: 'Beta-Platz sichern', language: 'English', languageCode: 'en', languagePath: '/en/' },
    hero: {
        before: 'Eine Sache',
        after: 'nach der anderen.',
        done: 'Fertig',
        pause: 'Animation anhalten',
        play: 'Animation abspielen',
        sub: 'Quidey ist der Lernplaner für Schule und Studium: Aufgaben, Fokus-Timer und Kalender in einer App, und Freunde, mit denen du live zusammen lernst.',
        cta: 'Beta-Platz sichern',
        note: 'Kostenlos in der Beta. Ohne Werbung, ohne Tracking.',
    },
    features: [
        {
            id: 'focus',
            heading: 'Fokus-Timer für eine Aufgabe.',
            text: 'Zieh eine Aufgabe ins Fokusfeld und starte den Timer. Quidey zählt mit, wie lange du daran sitzt, und hakt sie mit dir ab.',
            points: [
                'Countdown mit deiner Länge, etwa 25 Minuten wie bei Pomodoro, oder Stoppuhr',
                'Geplante Zeit gegen echte Lernzeit, für jede Aufgabe',
                'Notizen festhalten, ohne den Fokus zu verlieren',
            ],
            ui: { label: 'Im Fokus', task: 'Deine Aufgabe', session: 'In dieser Sitzung', notes: 'Notizen', note: 'Gedanken festhalten, ohne den Fokus zu verlieren' },
        },
        {
            id: 'plan',
            heading: 'Lernplan und Kalender.',
            text: 'Aufgaben mit Tag und Uhrzeit, Termine und Klausuren als Events, Erinnerungen vorher. Was jede Woche, jeden Monat oder jedes Jahr wiederkommt, trägt sich von selbst ein.',
            points: [
                'Monat, Woche und Agenda, Aufgaben per Ziehen auf einen anderen Tag',
                'Gruppen und Farben für Fächer, Module und Projekte',
                'Erinnerungen in der App und per Mail',
            ],
            ui: { weekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'], chips: ['Lernen', 'Sport', 'Termin', 'Projekt', 'Lesen'], repeat: 'Wiederholt sich', reminder: 'Erinnerung' },
        },
        {
            id: 'together',
            heading: 'Online zusammen lernen.',
            text: 'Starte eine Sitzung mit Freunden. Jeder arbeitet an seinem, eine Stoppuhr zählt für alle, und am Ende seht ihr, was geschafft ist.',
            points: [
                'Eine gemeinsame Aufgabenliste für die ganze Lerngruppe',
                'Sehen, wer gerade online ist und woran gearbeitet wird',
                'Chat in der Sitzung und Nachrichten unter Freunden',
            ],
            ui: { title: 'Gemeinsame Sitzung', live: 'arbeitet gerade', pause: 'Pause', tasks: ['Aufgabe', 'Aufgabe', 'Pause'] },
        },
        {
            id: 'progress',
            heading: 'Serie, Level, Statistik.',
            text: 'Jede Minute im Fokus und jede erledigte Aufgabe bringt Erfahrung. Die Serie zählt deine Lerntage am Stück, und deine Pflanze wächst mit jedem Level vom Samenkorn bis zum Urwald.',
            points: [
                'Lernstatistik nach Woche, Monat und Jahr',
                'Drei Challenges am Tag, zwei in der Woche',
                'Rangliste und Feed mit Freunden, nur wenn du willst',
            ],
            ui: {
                streak: 'Serie', streakDays: '12 Tage am Stück', weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                level: 'Level 7', tier: 'Setzling', xp: '340 von 600 XP',
                today: 'Heute', challenges: [['25 Minuten fokussieren', 'done'], ['3 Aufgaben erledigen', '2/3'], ['2 Einträge für morgen planen', '0/2']],
            },
        },
        {
            id: 'style',
            heading: 'Ganz nach deinem Stil.',
            text: 'Deine Lieblingsfarbe, helles oder dunkles Design und Animationen von ganz ruhig bis extrem. Probier eine Farbe aus.',
            points: [
                'Sechs Akzentfarben und sechs Farbwelten',
                'Hell, dunkel oder wie dein System',
                'Auf Deutsch und auf Englisch',
            ],
            ui: { colours: 'Farbthema', theme: 'Design', themes: ['Dunkel', 'Hell', 'System'], motion: 'Animationen', motions: ['Minimal', 'Normal', 'Extrem'], names: { sunset: 'Abendrot', green: 'Grün', ocean: 'Ozean', rose: 'Rose', gold: 'Gold' } },
        },
    ],
    audience: {
        heading: 'Für Schule, Uni und Lerngruppe.',
        groups: [
            ['Schule und Abitur', 'Hausaufgaben, Referate und Klausurtermine in einer Liste. Mit dem Fokus-Timer wird aus „ich müsste mal lernen“ eine halbe Stunde, die wirklich zählt.'],
            ['Studium und Prüfungsphase', 'Vorlesungen als wiederkehrende Termine, Abgaben mit Erinnerung, und die Statistik zeigt, wie viel Zeit in jedes Modul geflossen ist.'],
            ['Lerngruppe und Freunde', 'Verabredet euch zur gemeinsamen Sitzung, auch über Städte hinweg. Wer gerade lernt, erkennst du am grünen Punkt neben dem Namen.'],
        ],
    },
    more: {
        heading: 'Alles für deinen Lernalltag.',
        items: [
            ['Statistiken', 'Lernzeit, erledigte Aufgaben und Termine nach Woche, Monat und Jahr, dazu eine Heatmap über ein halbes Jahr.'],
            ['Events und Termine', 'Vorlesung, Training, Klausur: eigene Event-Typen mit Farbe, die Quidey am Namen erkennt.'],
            ['Quidey Family', 'Ein fester Kreis für WG, Familie oder Lerngruppe, mit gemeinsamem Kalender, Pinnwand, Liste und Chat.'],
            ['Aufgaben teilen', 'Schick Freunden eine Aufgabe. Wird sie angenommen, steht sie in ihrer Liste.'],
            ['Profil und Freunde', 'Banner, Status und Studienfach. Deine Statistik sehen Freunde nur, wenn du es erlaubst.'],
            ['Postfach', 'Nachrichten unter Freunden und Hinweise aus der App an einem Ort.'],
            ['Als App installieren', 'Auf dem Startbildschirm von Handy und Rechner, ohne App Store.'],
            ['Mehrere Konten', 'Bis zu fünf Konten auf einem Gerät, etwa Schule und Privat, mit einem Klick gewechselt.'],
        ],
    },
    faq: {
        heading: 'Fragen zu Quidey',
        items: [
            ['Was kostet Quidey?', 'Während der Beta nichts. Es gibt kein Bezahlsystem, also kann auch nichts automatisch kostenpflichtig werden.'],
            ['Ist der Fokus-Timer ein Pomodoro-Timer?', 'Er läuft als Countdown mit der Länge, die du einstellst, zum Beispiel 25 Minuten wie bei der Pomodoro-Technik, oder als Stoppuhr, die einfach mitzählt. Die Zeit wird der Aufgabe gutgeschrieben, an der du gerade sitzt.'],
            ['Kann ich online mit Freunden zusammen lernen?', 'Ja. In einer gemeinsamen Sitzung seht ihr, wer gerade lernt und woran, eine Stoppuhr zählt für alle, und es gibt einen Chat. Ihr braucht dafür beide ein Konto und seid in Quidey befreundet.'],
            ['Für wen ist Quidey gedacht?', 'Für alle, die lernen: Schülerinnen und Schüler, Studierende, Azubis und Lerngruppen. Quidey ist kein Werkzeug für Firmenteams, sondern für deinen eigenen Lernalltag und die Leute, mit denen du lernst.'],
            ['Warum eine geschlossene Beta?', 'Damit ich jede Rückmeldung lesen und Fehler schnell beheben kann. Du legst ein Konto an, sagst in einem Satz, wofür du Quidey nutzen willst, und ich schalte dich frei.'],
            ['Was passiert mit meinen Daten?', 'Sie liegen auf einem Server bei STRATO in Deutschland. Keine Werbung, kein Tracking, keine Cookies. Im Profil kannst du dein Konto jederzeit löschen, mit allem, was dazugehört.'],
            ['Gibt es eine App fürs Handy?', 'Quidey läuft im Browser unter app.quidey.com, auf dem Handy genauso wie am Rechner, auf Android wie auf dem iPhone. Du kannst die Seite zu deinem Startbildschirm hinzufügen, dann öffnet sie sich wie eine App.'],
            ['Gibt es Quidey auch auf Englisch?', 'Ja. Die App gibt es auf Deutsch und auf Englisch, die Sprache stellst du in den Einstellungen um.'],
        ],
    },
    cta: {
        heading: 'Neu hier?',
        placeholder: 'deine@mail.de',
        emailLabel: 'Deine E-Mail-Adresse',
        button: 'Los',
        note: 'Weiter geht es in der App: Dort legst du mit deiner Mail dein Konto an.',
    },
    footer: {
        invitation: 'Fang mit einer Sache an.',
        button: 'Beta-Platz sichern',
        about: 'Quidey ist ein Lernplaner für Schule und Studium, mit Fokus-Timer, Kalender und gemeinsamen Lernsessions. Server in Deutschland.',
        pagesLabel: 'Auf dieser Seite',
        legalLabel: 'Rechtliches',
        links: legal(['Kontakt', 'Impressum', 'Datenschutz', 'Nutzungsbedingungen']),
    },
    notFound: {
        title: 'Seite nicht gefunden',
        heading: 'Diese Seite gibt es nicht.',
        text: 'Vielleicht suchst du die App?',
        app: 'Zur App',
        home: 'Zur Startseite',
        forwarding: 'Du wirst zur App weitergeleitet …',
    },
};

const en = {
    lang: 'en',
    path: '/en/',
    meta: {
        title: 'Quidey – your planner for everyday life and studies',
        description: 'A study planner for school and university: tasks, a focus timer, a calendar and live study sessions with friends. Free during the beta, no ads, no tracking.',
        image: '/og/quidey-en.png',
        imageAlt: 'Quidey: One thing after another. A study planner with a focus timer, a calendar and study groups.',
        featureList: [
            'Task and to-do list with groups, colours and priorities',
            'Focus timer as a countdown or a stopwatch',
            'Calendar with month, week and agenda views',
            'Repeating tasks and appointments, email reminders',
            'Live study sessions with friends, with chat',
            'Study statistics, streaks, levels and daily challenges',
            'Shared calendar for family, flatmates or a study group',
            'Installable as an app on phone and computer',
        ],
    },
    nav: { focus: 'Focus', plan: 'Plan', together: 'Together', more: 'Features', faq: 'Questions', label: 'Sections of the page', signIn: 'Sign in', cta: 'Get a beta spot', language: 'Deutsch', languageCode: 'de', languagePath: '/' },
    hero: {
        before: 'One thing',
        after: 'after another.',
        done: 'Done',
        pause: 'Pause animation',
        play: 'Play animation',
        sub: 'Quidey is the study planner for school and university: tasks, a focus timer and a calendar in one app, and friends to study with live.',
        cta: 'Get a beta spot',
        note: 'Free during the beta. No ads, no tracking.',
    },
    features: [
        {
            id: 'focus',
            heading: 'A focus timer for one task.',
            text: 'Drag a task into the focus field and start the timer. Quidey counts how long you work on it and ticks it off with you.',
            points: [
                'A countdown of your length, say 25 minutes like Pomodoro, or a stopwatch',
                'Planned time against real study time, for every task',
                'Jot down notes without losing focus',
            ],
            ui: { label: 'In focus', task: 'Your task', session: 'This session', notes: 'Notes', note: 'Jot thoughts down without losing focus' },
        },
        {
            id: 'plan',
            heading: 'Study plan and calendar.',
            text: 'Tasks with a day and a time, appointments and exams as events, reminders before they start. Whatever comes back every week, month or year adds itself.',
            points: [
                'Month, week and agenda; drag a task to another day',
                'Groups and colours for subjects, modules and projects',
                'Reminders in the app and by email',
            ],
            ui: { weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], chips: ['Study', 'Sport', 'Meeting', 'Project', 'Reading'], repeat: 'Repeats', reminder: 'Reminder' },
        },
        {
            id: 'together',
            heading: 'Study together online.',
            text: 'Start a session with friends. Everyone works on their own, one stopwatch counts for all of you, and at the end you see what got done.',
            points: [
                'One shared task list for the whole study group',
                'See who is online right now and what they work on',
                'Chat in the session and messages between friends',
            ],
            ui: { title: 'Shared session', live: 'working now', pause: 'Break', tasks: ['Task', 'Task', 'Break'] },
        },
        {
            id: 'progress',
            heading: 'Streaks, levels, statistics.',
            text: 'Every minute in focus and every finished task earns experience. Your streak counts your study days in a row, and your plant grows with every level, from a seed to an ancient forest.',
            points: [
                'Study statistics by week, month and year',
                'Three challenges a day, two a week',
                'Ranking and feed with friends, only if you want',
            ],
            ui: {
                streak: 'Streak', streakDays: '12 days in a row', weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                level: 'Level 7', tier: 'Sapling', xp: '340 of 600 XP',
                today: 'Today', challenges: [['Focus for 25 minutes', 'done'], ['Finish 3 tasks', '2/3'], ['Plan 2 entries for tomorrow', '0/2']],
            },
        },
        {
            id: 'style',
            heading: 'Made to your taste.',
            text: 'Your favourite colour, a light or dark design, and animations from very calm to extreme. Try a colour.',
            points: [
                'Six accent colours and six colour worlds',
                'Light, dark or like your system',
                'In English and in German',
            ],
            ui: { colours: 'Colour theme', theme: 'Design', themes: ['Dark', 'Light', 'System'], motion: 'Animations', motions: ['Minimal', 'Normal', 'Extreme'], names: { sunset: 'Sunset', green: 'Green', ocean: 'Ocean', rose: 'Rose', gold: 'Gold' } },
        },
    ],
    audience: {
        heading: 'For school and university.',
        groups: [
            ['School and final exams', 'Homework, presentations and exam dates in one list. The focus timer turns “I really should study” into half an hour that counts.'],
            ['University and exam season', 'Lectures as repeating appointments, deadlines with a reminder, and the statistics show how much time went into each module.'],
            ['Study groups and friends', 'Meet for a shared session, even across cities. Who is studying right now shows as a green dot beside their name.'],
        ],
    },
    more: {
        heading: 'Everything for your study days.',
        items: [
            ['Statistics', 'Study time, finished tasks and appointments by week, month and year, plus a heat map over half a year.'],
            ['Events and appointments', 'Lecture, training, exam: your own event types with a colour, which Quidey recognises by name.'],
            ['Quidey Family', 'A fixed circle for flatmates, family or a study group, with a shared calendar, board, list and chat.'],
            ['Share tasks', 'Send a friend a task. Once they accept it, it sits in their list.'],
            ['Profile and friends', 'Banner, status and field of study. Friends see your statistics only if you allow it.'],
            ['Inbox', 'Messages between friends and notes from the app in one place.'],
            ['Install as an app', 'On the home screen of your phone and computer, no app store needed.'],
            ['Several accounts', 'Up to five accounts on one device, say school and private, switched with one click.'],
        ],
    },
    faq: {
        heading: 'Questions about Quidey',
        items: [
            ['What does Quidey cost?', 'Nothing during the beta. There is no payment system, so nothing can start costing money on its own.'],
            ['Is the focus timer a Pomodoro timer?', 'It runs as a countdown of the length you set, for example 25 minutes like the Pomodoro technique, or as a stopwatch that simply counts along. The time goes to the task you are working on.'],
            ['Can I study online with friends?', 'Yes. In a shared session you see who is studying right now and on what, one stopwatch counts for everyone, and there is a chat. You both need an account and to be friends in Quidey.'],
            ['Who is Quidey for?', 'For everyone who studies: pupils, students, apprentices and study groups. Quidey is not a tool for company teams but for your own study days and the people you study with.'],
            ['Why a closed beta?', 'So I can read every piece of feedback and fix things fast. You create an account, say in one sentence what you want to use Quidey for, and I let you in.'],
            ['What happens to my data?', 'It sits on a server at STRATO in Germany. No ads, no tracking, no cookies. You can delete your account in your profile at any time, with everything in it.'],
            ['Is there a phone app?', 'Quidey runs in the browser at app.quidey.com, on your phone just like on your computer, on Android and on the iPhone. Add it to your home screen and it opens like an app.'],
            ['Is Quidey available in English?', 'Yes. The app is in English and in German; you switch the language in the settings.'],
        ],
    },
    cta: {
        heading: 'New here?',
        placeholder: 'you@mail.com',
        emailLabel: 'Your email address',
        button: 'Go',
        note: 'You continue in the app, where you create your account with your email.',
    },
    footer: {
        invitation: 'Start with one thing.',
        button: 'Get a beta spot',
        about: 'Quidey is a study planner for school and university, with a focus timer, a calendar and shared study sessions. Servers in Germany.',
        pagesLabel: 'On this page',
        legalLabel: 'Legal',
        links: legal(['Contact', 'Imprint', 'Privacy', 'Terms']),
    },
    notFound: {
        title: 'Page not found',
        heading: 'This page doesn’t exist.',
        text: 'Looking for the app?',
        app: 'Open the app',
        home: 'Home page',
        forwarding: 'Taking you to the app …',
    },
};

export const COPY = { de, en };
