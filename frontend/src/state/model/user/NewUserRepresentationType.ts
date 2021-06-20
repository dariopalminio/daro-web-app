export type NewUserRepresentationType = {
    username: string
    enabled: string
    emailVerified: string
    firstName: string
    lastName: string
    email: string
    credentials: [
      {
        type: string,
        value: string,
        temporary: string,
      },
    ],
  };