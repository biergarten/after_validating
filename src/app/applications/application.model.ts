export interface MembershipApplication {
  id: string,
  membershipType: string,
  emailLocation: string,
  assignToUserId: string,
  dateInitiated: string,
  status: string,
  person: Person
}

export interface Person {
  name: PersonName,
  phone: string,
  email: string
}

export interface PersonName {
  firstName: string,
  lastName: string
}

export const phoneTypeValues = [
  { title: 'Mobile', value: 'mobile' },
  { title: 'Work', value: 'work' },
  { title: 'Other', value: 'other' },
];

export const addressTypeValues = [
  { title: 'Home', value: 'home' },
  { title: 'Work', value: 'work' },
  { title: 'Other', value: 'other' },
];
