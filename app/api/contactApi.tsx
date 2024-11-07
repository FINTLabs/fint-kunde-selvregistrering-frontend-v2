// const api = process.env.APIURL;
const api = "http://localhost:8080";

export interface IContact {
  nin: string;
  firstName: string;
  lastName: string;
  mail: string;
  mobile: string;
}

export default class ContactApi {
  static async createContact(contact: IContact) {
    const check = await this.checkIfExistingContact(contact);

    if (!check) {
      const response = await fetch(`${api}/api/self/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (!response.ok) {
        throw new Error("Failed to create contact");
      }

      return response.json();
    }
  }

  static async checkIfExistingContact(nin: string) {
    const response = await fetch(
      `${api}/api/self/register?nin=${encodeURIComponent(nin)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(nin, response);
    return response.ok;
  }
}
