/**
 * Shared event data for Events list and EventView detail page.
 * Each event can have list-only fields (title, date, location, image) and optional detail fields.
 */
export const events = [
    {
        id: 1,
        image: '/ateneo homecoming 3.jpg',
        title: 'Alumni Career Fair & Networking Night',
        date: 'October 13, 2025',
        location: 'Finster Auditorium',
        // Optional detail view fields (fallbacks used if missing)
        tagline: '',
        description: '',
        registrationDeadline: '',
        venueAddress: '',
        organizerName: '',
        cost: '',
        startTime: '',
        endTime: '',
        detailsDate: '',
        registerUrl: '',
    },
    {
        id: 2,
        image: '/martinhall.jpg',
        title: 'Alumni Sports Fest',
        date: 'August 14, 2025',
        location: 'Martin Hall, 4F',
        tagline: '',
        description: '',
        registrationDeadline: '',
        venueAddress: '',
        organizerName: '',
        cost: '',
        startTime: '',
        endTime: '',
        detailsDate: '',
        registerUrl: '',
    },
    {
        id: 3,
        image: '/ateneo homecoming 1.jpg',
        title: 'Homecoming Gala 2025',
        date: 'July 30, 2025',
        location: 'SMX Convention, SM Lanang',
        tagline: '',
        description: '',
        registrationDeadline: '',
        venueAddress: '',
        organizerName: '',
        cost: '',
        startTime: '',
        endTime: '',
        detailsDate: '',
        registerUrl: '',
    },
    {
        id: 4,
        image: '/ateneo homecoming 2.jpg',
        title: 'Grand Alumni Homecoming 2025',
        date: 'July 30, 2025',
        location: 'Cafe Julieta, Juna Subdivision',
        tagline: 'Join fellow alumni for a weekend of pride, connection, and celebration—right here in Davao City.',
        description: 'Experience a full lineup of activities, including alumni talks on technology and innovation, student showcases, the Alumni Excellence Awards, campus heritage tours, and networking mixers. Relive cherished traditions like batch reunion dinners, the Homecoming Gala, and the All-Alumni Celebration Night.',
        registrationDeadline: 'Monday, June 30, 2025',
        venueAddress: 'Cafe Julieta in\n188 Tulip Drive,\nJuna Subdivision,\nMatina 8000,\nDavao City',
        organizerName: 'Honeydei Nakagawa (MS \'95)',
        cost: 'P3000',
        startTime: '6:00 pm',
        endTime: '8:15 pm',
        detailsDate: 'Wednesday, July 30, 2025',
        registerUrl: '#register',
    },
];

export function getEventById(id) {
    const numId = Number(id);
    return events.find((e) => e.id === numId) || null;
}
