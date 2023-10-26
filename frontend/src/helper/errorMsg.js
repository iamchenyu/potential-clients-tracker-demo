const errMapping = {
  "instance.comment is not of a type(s) string": "Comments cannot be empty",
  'duplicate key value violates unique constraint "users_email_key"':
    "Email has already been taken",
  "No such user": "No such user",
  "invalid email/password": "Invalid email/password",
  "New client information cannot be empty":
    "New client information cannot be empty",
  "Can't add another date. Please delete the existing one first.":
    "Can't add another date. Please delete the existing one first.",
  "Not Editor/Admin": "Not Editor/Admin",
  "No Updated Data": "No Updated Data",
  "Invalid link or time expired": "Invalid link or time expired",
  "Log In Failed": "Log In Failed",
  "Not Admin": "Not Admin",
  "No such client": "No such client",
  "No such status": "No such status",
  "No such client/status": "No such client/status",
  "No such comment": "No such comments",
};

export default errMapping;
