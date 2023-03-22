const errMapping = {
  "instance.comment is not of a type(s) string": "Comments cannot be empty",
  'duplicate key value violates unique constraint "users_email_key"':
    "Email has already been taken",
  "No such user": "No such user",
  "invalid email/password": "Invalid email/password",
  "New client information cannot be empty":
    "New client information cannot be empty",
  "Can't change start date": "Can't change start date",
  "Can't delete the start date": "Can't delete the start date",
};

export default errMapping;
