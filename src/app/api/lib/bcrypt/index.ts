import bcrypt from "bcrypt";

export class Bcrypt {
  static hash(password: string) {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  static compare(password: string, hashed: string) {
    return bcrypt.compareSync(password, hashed);
  }
}
